const mongoose = require("mongoose");
const { sendError } = require("../utils/responseBody");

// Validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return sendError(res, 400, "Invalid ID format", [
            "The provided ID is not a valid MongoDB ObjectId"
        ]);
    }

    next();
};

module.exports = validateObjectId;
