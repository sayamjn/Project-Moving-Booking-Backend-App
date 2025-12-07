const {
    createShowService,
    getAllShowsService,
    getShowByIdService,
    updateShowService,
    deleteShowService,
    getShowsByMovieService,
    getShowsByTheatreService,
    bookSeatsService
} = require("../service/show.service");
const { sendSuccess, sendError } = require("../utils/responseBody");

// Create a new show
const createShow = async (req, res) => {
    try {
        const {
            movie,
            theatre,
            screenNumber,
            showDate,
            showTime,
            pricing,
            totalSeats,
            showType,
            language
        } = req.body;

        const show = await createShowService({
            movie,
            theatre,
            screenNumber,
            showDate,
            showTime,
            pricing,
            totalSeats,
            showType,
            language
        });

        return sendSuccess(res, 201, "Show created successfully", show);
    } catch (error) {
        console.log(error);
        return sendError(res, 500, "Error while creating show", [error.message]);
    }
};

// Get all shows
const getAllShows = async (req, res) => {
    try {
        const { movie, theatre, showDate, status } = req.query;
        const filters = {};

        if (movie) filters.movie = movie;
        if (theatre) filters.theatre = theatre;
        if (showDate) filters.showDate = showDate;
        if (status) filters.status = status;

        const shows = await getAllShowsService(filters);
        return sendSuccess(res, 200, "Shows fetched successfully", shows);
    } catch (error) {
        console.log(error);
        return sendError(res, 500, "Error while fetching shows", [error.message]);
    }
};

// Get a single show by ID
const getShowById = async (req, res) => {
    try {
        const show = await getShowByIdService(req.params.id);
        if (!show) {
            return sendError(res, 404, "Show not found");
        }
        return sendSuccess(res, 200, "Show fetched successfully", show);
    } catch (error) {
        console.log(error);
        return sendError(res, 500, "Error while fetching show", [error.message]);
    }
};

// Update a show by ID
const updateShow = async (req, res) => {
    try {
        const {
            movie,
            theatre,
            screenNumber,
            showDate,
            showTime,
            pricing,
            totalSeats,
            showType,
            language,
            status,
            isActive
        } = req.body;

        const show = await updateShowService(req.params.id, {
            movie,
            theatre,
            screenNumber,
            showDate,
            showTime,
            pricing,
            totalSeats,
            showType,
            language,
            status,
            isActive
        });

        if (!show) {
            return sendError(res, 404, "Show not found");
        }
        return sendSuccess(res, 200, "Show updated successfully", show);
    } catch (error) {
        console.log(error);
        return sendError(res, 500, "Error while updating show", [error.message]);
    }
};

// Delete a show by ID
const deleteShow = async (req, res) => {
    try {
        const show = await deleteShowService(req.params.id);
        if (!show) {
            return sendError(res, 404, "Show not found");
        }
        return sendSuccess(res, 200, "Show deleted successfully", show);
    } catch (error) {
        console.log(error);
        return sendError(res, 500, "Error while deleting show", [error.message]);
    }
};

// Get shows by movie
const getShowsByMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const { date } = req.query;

        const shows = await getShowsByMovieService(movieId, date);
        return sendSuccess(
            res,
            200,
            `Shows for movie fetched successfully`,
            shows
        );
    } catch (error) {
        console.log(error);
        return sendError(res, 500, "Error while fetching shows by movie", [
            error.message
        ]);
    }
};

// Get shows by theatre
const getShowsByTheatre = async (req, res) => {
    try {
        const { theatreId } = req.params;
        const { date } = req.query;

        const shows = await getShowsByTheatreService(theatreId, date);
        return sendSuccess(
            res,
            200,
            `Shows for theatre fetched successfully`,
            shows
        );
    } catch (error) {
        console.log(error);
        return sendError(res, 500, "Error while fetching shows by theatre", [
            error.message
        ]);
    }
};

// Book seats for a show
const bookSeats = async (req, res) => {
    try {
        const { showId } = req.params;
        const { seats } = req.body;

        if (!seats || !Array.isArray(seats) || seats.length === 0) {
            return sendError(res, 400, "Seats array is required");
        }

        const show = await bookSeatsService(showId, seats);
        return sendSuccess(res, 200, "Seats booked successfully", show);
    } catch (error) {
        console.log(error);
        return sendError(res, 400, "Error while booking seats", [error.message]);
    }
};

module.exports = {
    createShow,
    getAllShows,
    getShowById,
    updateShow,
    deleteShow,
    getShowsByMovie,
    getShowsByTheatre,
    bookSeats
};
