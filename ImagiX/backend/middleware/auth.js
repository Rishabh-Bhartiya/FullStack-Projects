import jwt from "jsonwebtoken";

/**
 * @description Express middleware to authenticate a user via a JWT.
 * It checks for a token in the request headers, verifies it, and attaches the user's ID to the request object.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {void} Calls the next middleware or returns an error response.
 */
const userAuth = async (req, res, next) => {
    // Check for the presence of the 'token' in the request headers
    const { token } = req.headers;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "User not authorized. Please log in.",
        });
    }

    try {
        // Verify the JWT with the secret key from environment variables
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // Ensure the decoded token contains a user ID. This is a crucial step.
        if (!tokenDecode.id) {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please log in again.",
            });
        }

        // Attach the user's ID to the request object for use in subsequent controllers
        req.userId = tokenDecode.id;

        // Call the next middleware function in the stack
        next();
    } catch (error) {
        // Catch errors from jwt.verify (e.g., expired token, malformed token)
        console.error("Authentication Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Authentication failed. Please log in again.",
        });
    }
};

export default userAuth;