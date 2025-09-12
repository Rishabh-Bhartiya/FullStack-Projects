import express from 'express';
import { generateImage } from '../controller/image.controller.js';
import userAuth from '../middleware/auth.js';

// Initialize a new Express router for image-related routes
const imageRouter = express.Router();

/**
 * @description Defines the route for image generation.
 * This route is a POST request to '/generate-image'.
 * It uses the 'userAuth' middleware to authenticate the user before
 * calling the 'generateImage' controller function.
 */
imageRouter.post('/generate-image', userAuth, generateImage);


export default imageRouter;