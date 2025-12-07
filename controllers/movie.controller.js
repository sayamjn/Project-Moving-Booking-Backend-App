const {
    createMovieService,
    getAllMoviesService,
    getMovieByIdService,
    updateMovieService,
    deleteMovieService
} = require("../service/movie.service");
const { sendSuccess, sendError } = require("../utils/responseBody");

// Create a new movie
const createMovie = async (req, res) => {
    try {
        const { name, description, casts, trailerUrl, language, releaseDate, releaseStatus, director, rating, duration, genre } = req.body
        const movie = await createMovieService({
            name,
            description,
            casts,
            trailerUrl,
            language,
            releaseDate,
            releaseStatus,
            director,
            rating,
            duration,
            genre
        })
        return sendSuccess(res, 201, "Movie created successfully", movie)
    } catch (error) {
        console.log(error)
        return sendError(res, 500, "Error while creating movie", [error.message])
    }
}

// Get all movies
const getAllMovies = async (req, res) => {
    try {
        const movies = await getAllMoviesService()
        return sendSuccess(res, 200, "Movies fetched successfully", movies)
    } catch (error) {
        console.log(error)
        return sendError(res, 500, "Error while fetching movies", [error.message])
    }
}

// Get a single movie by ID
const getMovieById = async (req, res) => {
    try {
        const movie = await getMovieByIdService(req.params.id)
        if (!movie) {
            return sendError(res, 404, "Movie not found")
        }
        return sendSuccess(res, 200, "Movie fetched successfully", movie)
    } catch (error) {
        console.log(error)
        return sendError(res, 500, "Error while fetching movie", [error.message])
    }
}

// Update a movie by ID
const updateMovie = async (req, res) => {
    try {
        const { name, description, casts, trailerUrl, language, releaseDate, releaseStatus, director, rating, duration, genre } = req.body
        const movie = await updateMovieService(req.params.id, {
            name,
            description,
            casts,
            trailerUrl,
            language,
            releaseDate,
            releaseStatus,
            director,
            rating,
            duration,
            genre
        })
        if (!movie) {
            return sendError(res, 404, "Movie not found")
        }
        return sendSuccess(res, 200, "Movie updated successfully", movie)
    } catch (error) {
        console.log(error)
        return sendError(res, 500, "Error while updating movie", [error.message])
    }
}

// Delete a movie by ID
const deleteMovie = async (req, res) => {
    try {
        const movie = await deleteMovieService(req.params.id)
        if (!movie) {
            return sendError(res, 404, "Movie not found")
        }
        return sendSuccess(res, 200, "Movie deleted successfully", movie)
    } catch (error) {
        console.log(error)
        return sendError(res, 500, "Error while deleting movie", [error.message])
    }
}

module.exports = {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie
}