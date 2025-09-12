import axios from "axios";
import Chat from "../models/Chat.Model.js";
import User from "../models/User.Model.js";
import imagekit from "../configs/imageKit.js";
import openai from "../configs/openAI.js"


// Text-Based AI Chat Message Controller
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        // Check Credits
        if (req.user.credits < 2) {
            return res.status(400).json({ success: false, message: "You Don't Have Enough Credits To Use This Feature" })
        }

        const { chatId, prompt } = req.body;


        const chat = await Chat.findOne({ userId, _id: chatId });
        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false
        })

        const { choices } = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const reply = { ...choices[0].message, timestamp: Date.now(), isImage: false }
        res.status(200).json({ success: true, reply })

        chat.messages.push(reply)
        await chat.save()
        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } })    // Credit Deduction For Text Generation


    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// Image Generation Message Controller
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        // Check Credits
        if (req.user.credits < 2) {
            return res.status(400).json({ success: false, message: "You Don't Have Enough Credits To Use This Feature" })
        }

        const { prompt, chatId, isPublished } = req.body;

        // Find Chat
        const chat = await Chat.findOne({ userId, _id: chatId })

        // Push User Message
        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false
        });

        // Encode The Prompt - For ImageKit
        const encodedPrompt = encodeURIComponent(prompt)

        // Construct ImageKit AI Generation URL
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/NeuroChat${Date.now()}.png?tr=w-800,h-800`;

        // Trigger Generation By Fetching From ImageKit
        const aiImageResponse = await axios.get(generatedImageUrl, { responseType: "arraybuffer" })

        // Convert To Base64
        const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data, "binary").toString('base64')}`;

        // Upload To ImageKit Media Library
        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: 'NeuroChat'
        })

        const reply = {
            role: "assistant",
            content: uploadResponse.url,
            timestamp: Date.now(),
            isImage: true,
            isPublished
        }
        res.status(200).json({ success: true, reply })

        chat.messages.push(reply)
        await chat.save()

        await User.updateOne({ _id: userId }, { $inc: { credits: -2 } })    // Credit Deduction For Image Generation

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}