import mongoose from "mongoose";

/**
 * @fileoverview This file defines the Mongoose schema and model for the User.
 * @module models/User
 */

/**
 * Mongoose schema for the User model.
 *
 * @typedef {object} userSchema
 * @property {string} name - The user's unique username. Required, unique, trimmed, and lowercased.
 * @property {string} email - The user's unique email address. Required, unique, trimmed, and lowercased.
 * @property {string} password - The user's password. Required. This should be hashed before saving.
 * @property {number} creditBalance - The number of credits for image generation, with a default value.
 * @property {Date} createdAt - Timestamp for when the user was created.
 * @property {Date} updatedAt - Timestamp for when the user was last updated.
 */
const userSchema = new mongoose.Schema(
    {
        // User's name with validation constraints.
        name: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        // User's email with validation constraints.
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        // User's password.
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        // The credit balance for the user, with a default value of 5.
        creditBalance: {
            type: Number,
            default: 5
        }
    },
    {
        // Automatically adds createdAt and updatedAt timestamps.
        timestamps: true
    }
)

// Create the User model. The check prevents model re-compilation in environments with hot-reloading.
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;