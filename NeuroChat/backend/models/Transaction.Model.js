import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "UserID is required"],
            lowercase: true,
            trim: true,
        },
        planId: {
            type: String,
            required: [true, "Select The Plan"],
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"],
        },
        credits: {
            type: Number,
            required: [true, "Credits Are Required"]
        },
        isPaid: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
