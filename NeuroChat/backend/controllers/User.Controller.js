import User from "../models/User.Model.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import Chat from "../models/Chat.Model.js";

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// API To Register User
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({ success: false, message: "User Already Exists" });
        }
        const user = await User.create({ name, email, password })
        const token = generateToken(user._id)
        res.status(201).json({ success: true, token })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// API To Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                const token = generateToken(user._id);
                return res.status(200).json({ success: true, token })
            }
        }
        return res.status(400).json({ success: false, message: 'Invalid Credentials' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// API To Get UserData
export const getUser = async (req, res) => {
    try {
        const user = req.user;
        return res.status(201).json({ success: true, user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// API To Get Published Images
export const getPublishedImages = async (req, res) => {
    try {
        const publishedImageMessages = await Chat.aggregate([
            { $unwind: "$messages" },
            {
                $match: {
                    "messages.isImage": true,
                    "messages.isPublished": true
                }
            },
            {
                $project: {
                    _id: 0,
                    imageUrl: "$messages.content",
                    userName: "$userName"
                }
            }
        ])
        res.status(200).json({ success: true, images: publishedImageMessages.reverse()})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}