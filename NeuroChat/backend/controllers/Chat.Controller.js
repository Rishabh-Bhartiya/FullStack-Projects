import Chat from "../models/Chat.Model.js";


// API Controller For Creating A New Chat
export const createChat = async (req, res) => {
    try {
        const userId = req.user._id;

        const chatData = {
            userId,
            userName: req.user.name,
            name: "New Chat",
            messages: [],
        }
        await Chat.create(chatData)
        res.status(200).json({ success: true, message: "Chat Created" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// API Controller For Getting All Chats
export const getChats = async (req, res) => {
    try {
        const userId = req.user._id;
        const chats = await Chat.find({ userId }).sort({ updatedAt: -1 })
        res.status(200).json({ success: true, message: chats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// API Controller For Deleting A Chat
export const deleteChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const { chatId } = req.body;

        await Chat.deleteOne({_id: chatId, userId})
        res.status(200).json({ success: true, message: "Chat Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}