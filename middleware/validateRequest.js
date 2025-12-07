const { sendError } = require("../utils/responseBody");

// Validate movie creation/update request
const validateMovieRequest = (req, res, next) => {
    const { name, description, casts, trailerUrl, director, releaseDate } = req.body;

    const errors = [];

    if (!name || name.trim() === "") {
        errors.push("Movie name is required");
    }

    if (!description || description.trim() === "") {
        errors.push("Movie description is required");
    }

    if (!casts || !Array.isArray(casts) || casts.length === 0) {
        errors.push("At least one cast member is required");
    }

    if (!trailerUrl || trailerUrl.trim() === "") {
        errors.push("Trailer URL is required");
    }

    if (!director || director.trim() === "") {
        errors.push("Director name is required");
    }

    if (!releaseDate) {
        errors.push("Release date is required");
    }

    if (errors.length > 0) {
        return sendError(res, 400, "Validation failed", errors);
    }

    next();
};

module.exports = { validateMovieRequest };
