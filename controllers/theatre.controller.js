const {
    createTheatreService,
    getAllTheatresService,
    getTheatreByIdService,
    updateTheatreService,
    deleteTheatreService,
    getTheatresByCityService
} = require("../service/theatre.service");
const { sendSuccess, sendError } = require("../utils/responseBody");

// Create a new theatre
const createTheatre = async (req, res) => {
    try {
        const { name, address, location, phone, email, screens, facilities, owner } = req.body;
        const theatre = await createTheatreService({
            name,
            address,
            location,
            phone,
            email,
            screens,
            facilities,
            owner
        });
        return sendSuccess(res, 201, "Theatre created successfully", theatre);
    } catch (error) {
        console.log(error);
        return sendError(res, 500, "Error while creating theatre", [error.message]);
    }
};

// Get all theatres
const getAllTheatres = async (req, res) => {
    try {
        const { city, isActive } = req.query;
        const filters = {};
        
        if (city) filters.city = city;
        if (isActive !== undefined) filters.isActive = isActive === "true";
        
        const theatres = await getAllTheatresService(filters);
        return sendSuccess(res, 200, "Theatres fetched successfully", theatres);
    } catch (error) {
        console.log(error);
        return sendError(res, 500, "Error while fetching theatres", [error.message]);
    }
};

// Get a single theatre by ID
const getTheatreById = async (req, res) => {
    try {
        const theatre = await getTheatreByIdService(req.params.id);
        if (!theatre) {
            return sendError(res, 404, "Theatre not found");
        }
        return sendSuccess(res, 200, "Theatre fetched successfully", theatre);
    } catch (error) {
        console.log(error);
        return sendError(res, 500, "Error while fetching theatre", [error.message]);
    }
};

// Update a theatre by ID
const updateTheatre = async (req, res) => {
    try {
        const { name, address, location, phone, email, screens, facilities, owner, isActive } = req.body;
        const theatre = await updateTheatreService(req.params.id, {
            name,
            address,
            location,
            phone,
            email,
            screens,
            facilities,
            owner,
            isActive
        });
        if (!theatre) {
            return sendError(res, 404, "Theatre not found");
        }
        return sendSuccess(res, 200, "Theatre updated successfully", theatre);
    } catch (error) {
        console.log(error);
        return sendError(res, 500, "Error while updating theatre", [error.message]);
    }
};

// Delete a theatre by ID
const deleteTheatre = async (req, res) => {
    try {
        const theatre = await deleteTheatreService(req.params.id);
        if (!theatre) {
            return sendError(res, 404, "Theatre not found");
        }
        return sendSuccess(res, 200, "Theatre deleted successfully", theatre);
    } catch (error) {
        console.log(error);
        return sendError(res, 500, "Error while deleting theatre", [error.message]);
    }
};

// Get theatres by city
const getTheatresByCity = async (req, res) => {
    try {
        const { city } = req.params;
        const theatres = await getTheatresByCityService(city);
        return sendSuccess(res, 200, `Theatres in ${city} fetched successfully`, theatres);
    } catch (error) {
        console.log(error);
        return sendError(res, 500, "Error while fetching theatres by city", [error.message]);
    }
};

module.exports = {
    createTheatre,
    getAllTheatres,
    getTheatreById,
    updateTheatre,
    deleteTheatre,
    getTheatresByCity
};
