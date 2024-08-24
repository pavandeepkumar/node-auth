const corsMiddleware = (req, res, next) => {
    // Set CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific HTTP methods
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specific headers

    // Handle preflight requests
    if (req.method === "OPTIONS") {
        return res.sendStatus(204); // Respond to OPTIONS request with a 204 status
    }
    next();
};
module.exports = {
    corsMiddleware
}