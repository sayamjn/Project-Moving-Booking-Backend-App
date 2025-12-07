const Show = require("../models/show.model");

const createShowService = async (showData) => {
    // Set availableSeats to totalSeats initially
    showData.availableSeats = showData.totalSeats;
    
    const show = await Show.create(showData);
    return await Show.findById(show._id)
        .populate("movie", "name description director language genre rating duration")
        .populate("theatre", "name address phone screens facilities");
};

const getAllShowsService = async (filters = {}) => {
    const query = { isActive: true };

    if (filters.movie) {
        query.movie = filters.movie;
    }

    if (filters.theatre) {
        query.theatre = filters.theatre;
    }

    if (filters.showDate) {
        const date = new Date(filters.showDate);
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        query.showDate = { $gte: date, $lt: nextDay };
    }

    if (filters.status) {
        query.status = filters.status.toUpperCase();
    }

    const shows = await Show.find(query)
        .populate("movie", "name description director language genre rating duration")
        .populate("theatre", "name address phone screens facilities")
        .sort({ showDate: 1, showTime: 1 });

    return shows;
};

const getShowByIdService = async (id) => {
    const show = await Show.findById(id)
        .populate("movie", "name description director language genre rating duration releaseDate")
        .populate("theatre", "name address phone screens facilities owner");
    return show;
};

const updateShowService = async (id, showData) => {
    const show = await Show.findByIdAndUpdate(id, showData, {
        new: true,
        runValidators: true
    })
        .populate("movie", "name description director language genre rating duration")
        .populate("theatre", "name address phone screens facilities");
    return show;
};

const deleteShowService = async (id) => {
    const show = await Show.findByIdAndDelete(id);
    return show;
};

const getShowsByMovieService = async (movieId, date = null) => {
    const query = { movie: movieId, isActive: true, status: "SCHEDULED" };

    if (date) {
        const showDate = new Date(date);
        const nextDay = new Date(showDate);
        nextDay.setDate(showDate.getDate() + 1);
        query.showDate = { $gte: showDate, $lt: nextDay };
    }

    const shows = await Show.find(query)
        .populate("theatre", "name address phone facilities")
        .sort({ showDate: 1, showTime: 1 });

    return shows;
};

const getShowsByTheatreService = async (theatreId, date = null) => {
    const query = { theatre: theatreId, isActive: true, status: "SCHEDULED" };

    if (date) {
        const showDate = new Date(date);
        const nextDay = new Date(showDate);
        nextDay.setDate(showDate.getDate() + 1);
        query.showDate = { $gte: showDate, $lt: nextDay };
    }

    const shows = await Show.find(query)
        .populate("movie", "name description director language genre rating duration")
        .sort({ showDate: 1, showTime: 1 });

    return shows;
};

const bookSeatsService = async (showId, seats) => {
    const show = await Show.findById(showId);

    if (!show) {
        throw new Error("Show not found");
    }

    if (show.availableSeats < seats.length) {
        throw new Error("Not enough seats available");
    }

    // Check if any seat is already booked
    const alreadyBooked = seats.filter(seat => show.bookedSeats.includes(seat));
    if (alreadyBooked.length > 0) {
        throw new Error(`Seats already booked: ${alreadyBooked.join(", ")}`);
    }

    show.bookedSeats.push(...seats);
    show.availableSeats -= seats.length;
    await show.save();

    return await Show.findById(showId)
        .populate("movie", "name description director language genre rating duration")
        .populate("theatre", "name address phone facilities");
};

module.exports = {
    createShowService,
    getAllShowsService,
    getShowByIdService,
    updateShowService,
    deleteShowService,
    getShowsByMovieService,
    getShowsByTheatreService,
    bookSeatsService
};
