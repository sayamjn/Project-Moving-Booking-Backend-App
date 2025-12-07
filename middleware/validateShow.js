const { sendError } = require("../utils/responseBody");

// Validate show creation/update request
const validateShowRequest = (req, res, next) => {
    const { movie, theatre, screenNumber, showDate, showTime, pricing, totalSeats, language } = req.body;

    const errors = [];

    if (!movie || movie.trim() === "") {
        errors.push("Movie ID is required");
    }

    if (!theatre || theatre.trim() === "") {
        errors.push("Theatre ID is required");
    }

    if (!screenNumber || screenNumber < 1) {
        errors.push("Valid screen number is required");
    }

    if (!showDate) {
        errors.push("Show date is required");
    }

    if (!showTime || showTime.trim() === "") {
        errors.push("Show time is required");
    } else if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(showTime)) {
        errors.push("Show time must be in HH:MM format (24-hour)");
    }

    if (!pricing || !pricing.standard || pricing.standard < 0) {
        errors.push("Valid standard pricing is required");
    }

    if (!totalSeats || totalSeats < 1) {
        errors.push("Total seats must be at least 1");
    }

    if (!language || language.trim() === "") {
        errors.push("Language is required");
    }

    if (errors.length > 0) {
        return sendError(res, 400, "Validation failed", errors);
    }

    next();
};

module.exports = { validateShowRequest };
