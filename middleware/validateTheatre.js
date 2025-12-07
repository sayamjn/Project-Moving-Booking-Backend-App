const { sendError } = require("../utils/responseBody");

// Validate theatre creation/update request
const validateTheatreRequest = (req, res, next) => {
    const { name, address, phone, screens, owner } = req.body;

    const errors = [];

    if (!name || name.trim() === "") {
        errors.push("Theatre name is required");
    }

    if (!address) {
        errors.push("Address is required");
    } else {
        if (!address.street || address.street.trim() === "") {
            errors.push("Street address is required");
        }
        if (!address.city || address.city.trim() === "") {
            errors.push("City is required");
        }
        if (!address.state || address.state.trim() === "") {
            errors.push("State is required");
        }
        if (!address.zipCode || address.zipCode.trim() === "") {
            errors.push("Zip code is required");
        }
    }

    if (!phone || phone.trim() === "") {
        errors.push("Phone number is required");
    } else if (!/^[0-9]{10}$/.test(phone)) {
        errors.push("Phone number must be 10 digits");
    }

    if (!screens || screens < 1) {
        errors.push("Number of screens must be at least 1");
    }

    if (!owner || owner.trim() === "") {
        errors.push("Owner name is required");
    }

    if (errors.length > 0) {
        return sendError(res, 400, "Validation failed", errors);
    }

    next();
};

module.exports = { validateTheatreRequest };
