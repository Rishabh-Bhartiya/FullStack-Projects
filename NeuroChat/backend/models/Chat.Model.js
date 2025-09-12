import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            ref: "User",
            required: [true, "Username is required"],
            lowercase: true,
            trim: true,
        },
        userName: {
            type: String,
            required: [true, "UserName is required"],
        },
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        messages: [
            {
                isImage: {
                    type: Boolean,
                    required: true,
                },
                isPublished: {
                    type: Boolean,
                    default: false,
                },
                role: {
                    type: String,
                    required: true,
                },
                content: {
                    type: String,
                    required: true,
                },
                timestamp: {
                    type: Number,
                    required: true,
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
