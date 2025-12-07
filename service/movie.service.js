const Movie = require("../models/movie.model");

const createMovieService = async (movieData) => {
    const movie = await Movie.create(movieData);
    return movie;
};

const getAllMoviesService = async () => {
    const movies = await Movie.find();
    return movies;
};

const getMovieByIdService = async (id) => {
    const movie = await Movie.findById(id);
    return movie;
};

const updateMovieService = async (id, movieData) => {
    const movie = await Movie.findByIdAndUpdate(id, movieData, { new: true });
    return movie;
};

const deleteMovieService = async (id) => {
    const movie = await Movie.findByIdAndDelete(id);
    return movie;
};

module.exports = {
    createMovieService,
    getAllMoviesService,
    getMovieByIdService,
    updateMovieService,
    deleteMovieService
};
