import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Loads environment variables from the .env file
import connectDB from './config/mongoDB.js';
import userRouter from './routes/user.route.js';
import imageRouter from './routes/image.route.js';

// Define the port for the server, defaulting to 4000 if not specified in environment variables
const PORT = process.env.PORT || 4000;

// Initialize the Express application
const app = express();

// Middleware
// Enable Express to parse JSON formatted request bodies
app.use(express.json());
// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Database Connection
// Connect to the MongoDB database using the async connectDB function
// 'await' is used here, enabled by the top-level await feature in modern Node.js
await connectDB();

// API Routes
// Mount the user router to handle all requests starting with '/api/user'
app.use('/api/user', userRouter);
// Mount the image router to handle all requests starting with '/api/image'
app.use('/api/image', imageRouter);

// Root Endpoint
// A simple GET request to the root URL to verify the API is running
app.get('/', (req, res) => res.send("API Working Properly"));

// Start the server
// Listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});