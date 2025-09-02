import express from 'express';
import {
    registerUser,
    loginUser,
    userCredits,
    paymentRazorpay,
    verifyRazorpay // It's a good practice to import all used functions
} from "../controller/user.controller.js";
import userAuth from '../middleware/auth.js';

// Initialize a new Express router for user-related routes
const userRouter = express.Router();

/**
 * @description Defines the routes for user authentication and management.
 * * Public Routes (no authentication required):
 * - POST /register: Endpoint for creating a new user account.
 * - POST /login: Endpoint for authenticating a user and receiving a JWT.
 */
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

/**
 * @description Authenticated Routes (require a valid JWT).
 * The 'userAuth' middleware is used to protect these endpoints.
 * * - GET /credits: Retrieves the credit balance of the authenticated user.
 * - POST /pay-razor: Initiates a new payment order via Razorpay.
 * - POST /verify-razor: Verifies a successful payment and updates user credits.
 */
userRouter.get('/credits', userAuth, userCredits);
userRouter.post('/pay-razor', userAuth, paymentRazorpay);
userRouter.post('/verify-razor', userAuth, verifyRazorpay); // Added the missing verify route

export default userRouter;