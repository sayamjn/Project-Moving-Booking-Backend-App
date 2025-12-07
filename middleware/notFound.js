const { sendError } = require("../utils/responseBody");

// 404 handler middleware
const notFound = (req, res) => {
    return sendError(res, 404, `Route ${req.originalUrl} not found`);
};

module.exports = notFound;
