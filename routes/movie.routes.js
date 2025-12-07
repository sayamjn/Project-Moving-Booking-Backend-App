const express = require("express");
const router = express.Router();
const {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie
} = require("../controllers/movie.controller");
const { validateMovieRequest } = require("../middleware/validateRequest");
const validateObjectId = require("../middleware/validateObjectId");

router.post("/movies", validateMovieRequest, createMovie);
router.get("/movies", getAllMovies);
router.get("/movies/:id", validateObjectId, getMovieById);
router.put("/movies/:id", validateObjectId, validateMovieRequest, updateMovie);
router.delete("/movies/:id", validateObjectId, deleteMovie);

module.exports = router;
