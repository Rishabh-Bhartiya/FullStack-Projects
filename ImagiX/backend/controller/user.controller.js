import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import Transaction from "../model/transaction.model.js";

/**
 * @file user.controller.js
 * @description Controller for user authentication (registration, login) and payment processing with Razorpay.
 * This file contains business logic for handling user data and managing transactions.
 */

/**
 * @description Registers a new user with a hashed password and generates a JWT.
 * @async
 * @param {object} req - The Express request object containing `name`, `email`, and `password` in the body.
 * @param {object} res - The Express response object.
 * @returns {Promise<object>} A JSON response with a success status, a JWT, and essential user details on success,
 * or an error message on failure.
 */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate that all required fields are present in the request body.
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Missing required details.' });
    }

    // Check if a user with the provided email already exists to prevent duplicate accounts.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User with this email already exists.' });
    }

    // Hash the user's password for security before storing it in the database.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance with the hashed password.
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user document to the database.
    const user = await newUser.save();

    // Generate a JSON Web Token (JWT) for the newly registered user for immediate authentication.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d', // Token expires in 1 day for security.
    });

    // Respond with a success message, the authentication token, and public user details.
    res.status(201).json({
      success: true,
      token,
      user: { name: user.name, email: user.email, message: `${user.name.toUpperCase()} Register Successfully.` },
    });

  } catch (error) {
    console.error("User registration error:", error);
    res.status(500).json({ success: false, message: 'An internal server error occurred during registration.' });
  }
};

/**
 * @description Authenticates a user by email and password and generates a JWT.
 * @async
 * @param {object} req - The Express request object containing `email` and `password` in the body.
 * @param {object} res - The Express response object.
 * @returns {Promise<object>} A JSON response with a success status, a JWT, and user details on successful login,
 * or an error message on failure.
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by their email.
    const user = await User.findOne({ email });

    // If no user is found, return an error.
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Compare the provided plain-text password with the stored hashed password.
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords match, generate and return a new JWT.
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.status(200).json({ success: true, token, user: { name: user.name, email: user.email, message: `${user.name.toUpperCase()} Login Successfully.` } });
    } else {
      // If passwords do not match, return an authentication failure message.
      return res.status(400).json({ success: false, message: 'Incorrect password.' });
    }
  } catch (error) {
    console.error("User login error:", error);
    res.status(500).json({ success: false, message: 'An internal server error occurred during login.' });
  }
};

/**
 * @description Fetches the credit balance and name for the authenticated user.
 * This function relies on the `userId` being set by an authentication middleware.
 * @async
 * @param {object} req - The Express request object, with `userId` from an authentication middleware.
 * @param {object} res - The Express response object.
 * @returns {Promise<object>} A JSON response with the user's credit balance and name on success, or an error message on failure.
 */
const userCredits = async (req, res) => {
  try {
    const userId = req.userId;
    // Find the user document by the ID provided by the authentication middleware.
    const user = await User.findById(userId);

    // Return an error if the user is not found, although this should be prevented by the middleware.
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Respond with the user's current credit balance and name.
    res.status(200).json({
      success: true,
      credits: user.creditBalance,
      user: {
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Fetching user credits error:", error);
    res.status(500).json({ success: false, message: 'An internal server error occurred while fetching credits.' });
  }
};

// Initialize the Razorpay instance with environment variables.
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * @description Creates a new order with the Razorpay API and a corresponding pending transaction document in the database.
 * This ensures a record exists with the full user ID before the client-side payment process begins.
 * @async
 * @param {object} req - The Express request object, with `userId` and `planId` in the body.
 * @param {object} res - The Express response object.
 * @returns {Promise<object>} A JSON response with the Razorpay order details on success, or an error message on failure.
 */
const paymentRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { planId } = req.body;

    const userData = await User.findById(userId);

    // Validate that the user and plan ID exist before proceeding.
    if (!userData || !planId) {
      return res.status(404).json({ success: false, message: 'User or plan not found.' });
    }

    let amount;

    // Define the available plans and their details as a single source of truth.
    const plans = {
      Basic: { credits: 100, amount: 10 },
      Advanced: { credits: 500, amount: 50 },
      Business: { credits: 5000, amount: 250 },
    };

    if (!plans[planId]) {
      return res.status(404).json({ success: false, message: 'Plan not found.' });
    }

    amount = plans[planId].amount;

    // Create a new, unique receipt ID for the Razorpay order.
    // This ID is used for tracking and can be short.
    const receiptId = `rcpt_${Date.now()}`;

    // Prepare options for the Razorpay order.
    const options = {
      amount: amount * 100, // Amount in paisa (smallest currency unit).
      currency: process.env.CURRENCY,
      receipt: receiptId,
    };

    // Create the order with the Razorpay API.
    const order = await razorpayInstance.orders.create(options);

    // Create a pending transaction document in the database with the full userId.
    const transactionData = {
      userId,
      plan: planId,
      amount,
      credits: plans[planId].credits,
      date: new Date(),
      razorpayOrderId: order.id,
      payment: false, // Initial status is false, to be updated upon successful payment.
    };

    await Transaction.create(transactionData);

    // Respond to the client with the order ID and other details to open the payment popup.
    res.status(200).json({ success: true, order });

  } catch (error) {
    console.error("Razorpay payment initiation error:", error);
    res.status(500).json({ success: false, message: 'An internal server error occurred during payment initiation.' });
  }
};

/**
 * @description Verifies a Razorpay payment and updates user credits and transaction history.
 * This function finds the pending transaction using the order ID and updates it upon successful payment.
 * @async
 * @param {object} req - The Express request object, with `razorpay_order_id`, `razorpay_payment_id`, and `razorpay_signature` in the body.
 * @param {object} res - The Express response object.
 * @returns {Promise<object>} A JSON response with a success status message.
 */
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    // Find the pending transaction document in the database using the order ID.
    const transactionData = await Transaction.findOne({ razorpayOrderId: razorpay_order_id });

    if (!transactionData) {
      return res.status(404).json({ success: false, message: 'Transaction not found.' });
    }

    // Fetch the order information from Razorpay to verify its status.
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    // Check if the order status is 'paid'.
    if (orderInfo.status === 'paid') {
      // Check if the transaction has already been processed to prevent double-adding credits.
      if (transactionData.payment) {
        return res.status(409).json({ success: false, message: 'Payment already processed.' });
      }

      // Atomically update the user's credit balance.
      await User.findByIdAndUpdate(transactionData.userId, { $inc: { creditBalance: transactionData.credits } });

      // Mark the transaction as paid.
      await Transaction.findByIdAndUpdate(transactionData._id, { payment: true });

      // Respond with a success message.
      res.status(201).json({ success: true, message: "Credits added successfully." });
    } else {
      // If the payment was not successful, return a failure message.
      res.status(200).json({ success: false, message: "Payment failed." });
    }
  } catch (error) {
    console.error("Razorpay verification error:", error);
    res.status(500).json({ success: false, message: 'An internal server error occurred during payment verification.' });
  }
};

export { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay };
