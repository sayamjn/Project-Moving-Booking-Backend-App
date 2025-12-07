const Theatre = require("../models/theatre.model");

const createTheatreService = async (theatreData) => {
    const theatre = await Theatre.create(theatreData);
    return theatre;
};

const getAllTheatresService = async (filters = {}) => {
    const query = {};
    
    if (filters.city) {
        query["address.city"] = new RegExp(filters.city, "i");
    }
    
    if (filters.isActive !== undefined) {
        query.isActive = filters.isActive;
    }
    
    const theatres = await Theatre.find(query);
    return theatres;
};

const getTheatreByIdService = async (id) => {
    const theatre = await Theatre.findById(id);
    return theatre;
};

const updateTheatreService = async (id, theatreData) => {
    const theatre = await Theatre.findByIdAndUpdate(id, theatreData, {
        new: true,
        runValidators: true
    });
    return theatre;
};

const deleteTheatreService = async (id) => {
    const theatre = await Theatre.findByIdAndDelete(id);
    return theatre;
};

const getTheatresByCityService = async (city) => {
    const theatres = await Theatre.find({
        "address.city": new RegExp(city, "i"),
        isActive: true
    });
    return theatres;
};

module.exports = {
    createTheatreService,
    getAllTheatresService,
    getTheatreByIdService,
    updateTheatreService,
    deleteTheatreService,
    getTheatresByCityService
};
