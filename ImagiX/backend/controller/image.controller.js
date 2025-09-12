import User from '../model/user.model.js';
import FormData from 'form-data';
import axios from 'axios';

/**
 * @description Controller function to handle image generation requests.
 * It validates user and their credit balance, sends a request to an external
 * AI service (Clipdrop), processes the response, and updates the user's credit balance.
 * @param {object} req - The Express request object, expecting a 'prompt' in the body and 'userId' from middleware.
 * @param {object} res - The Express response object.
 * @returns {Promise<object>} A JSON response with the generated image data or an error message.
 */
export const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;
        // Assuming 'req.userId' is set by an authentication middleware
        const userId = req.userId;

        // Find the user by their ID
        const user = await User.findById(userId);

        // --- Validation and Error Handling ---
        // Check if the user exists or if the prompt is missing
        if (!user || !prompt) {
            return res.status(404).json({ success: false, message: 'User not found or prompt not provided.' });
        }

        // Check for sufficient credit balance
        if (user.creditBalance <= 0) {
            return res.status(400).json({ success: false, message: 'Insufficient credits.', creditBalance: user.creditBalance });
        }

        // --- Image Generation API Call ---
        // Prepare the form data for the API request
        const formData = new FormData();
        formData.append('prompt', prompt);

        // Make a POST request to the Clipdrop API
        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY,
                // The FormData headers will be set automatically by the library
                ...formData.getHeaders(),
            },
            responseType: 'arraybuffer' // Expecting a binary image response
        });

        // --- Post-Processing and Database Update ---
        // Convert the binary image data to a Base64 string
        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        // Decrement the user's credit balance by 1
        // Use findByIdAndUpdate for a single, atomic operation
        await User.findByIdAndUpdate(user._id, {
            $inc: { creditBalance: -1 } // $inc is an atomic operator, better for concurrency
        });

        // Respond with the generated image and updated credit balance
        return res.status(200).json({ success: true, message: 'Image generated successfully.', creditBalance: user.creditBalance - 1, resultImage });

    } catch (error) {
        // Catch and handle any errors during the process
        console.error("Generate Image Error:", error.message);
        // Log the full error for debugging in development
        // console.error(error); 
        // Return a generic 500 status for the client
        return res.status(500).json({ success: false, message: error.message });
    }
};