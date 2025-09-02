import mongoose from "mongoose";

/**
 * Connects to the MongoDB database.
 * @async
 * @function connectDB
 * @returns {Promise<void>}
 */
const connectDB = async () => {
    // Event listener for successful database connection
    mongoose.connection.on('connected', () => {
        console.log("Database Connected");
    });

    // Attempt to connect to the MongoDB URI specified in environment variables
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/imagify`);
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit the process with an error code
    }
};

export default connectDB;