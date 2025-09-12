import mongoose from "mongoose";

/**
 * @fileoverview This file defines the Mongoose schema and model for payment transactions.
 * @module models/Transaction
 */

/**
 * Mongoose schema for the Transaction model.
 *
 * @typedef {object} TransactionSchema
 * @property {mongoose.Schema.Types.ObjectId} userId - Reference to the User model.
 * @property {string} plan - The name of the purchased credit plan.
 * @property {number} amount - The amount paid for the transaction.
 * @property {number} credits - The number of credits received.
 * @property {boolean} payment - A flag indicating successful payment.
 * @property {string} razorpayOrderId - The unique order ID from Razorpay.
 * @property {string} razorpayPaymentId - The unique payment ID from Razorpay.
 */
const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // The name of the credit plan.
    plan: {
        type: String,
        required: true
    },
    // The amount paid.
    amount: {
        type: Number,
        required: true
    },
    // The credits received.
    credits: {
        type: Number,
        required: true
    },
    // Payment status.
    payment: {
        type: Boolean,
        default: false
    },
    // Razorpay order ID. Can be unique.
    razorpayOrderId: {
        type: String,
        // unique: true, // Ye unique reh sakta hai
    },
    // Razorpay payment ID.
    razorpayPaymentId: {
        type: String
    }
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;