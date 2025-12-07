const express = require("express");
const router = express.Router();
const { 
    createMovie, 
    getAllMovies, 
    getMovieById, 
    updateMovie, 
    deleteMovie 
} = require("../controllers/movie.controller");

router.post("/movies", createMovie)
router.get("/movies", getAllMovies)
router.get("/movies/:id", getMovieById)
router.put("/movies/:id", updateMovie)
router.delete("/movies/:id", deleteMovie)

module.exports = router
