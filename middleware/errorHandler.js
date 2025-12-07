const { sendError } = require("../utils/responseBody");

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((e) => e.message);
        return sendError(res, 400, "Validation failed", errors);
    }

    // Mongoose cast error (invalid ObjectId)
    if (err.name === "CastError") {
        return sendError(res, 400, "Invalid ID format", [err.message]);
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return sendError(res, 409, `${field} already exists`, [
            `Duplicate value for ${field}`
        ]);
    }

    // Default error
    return sendError(res, 500, "Internal server error", [err.message]);
};

module.exports = errorHandler;
