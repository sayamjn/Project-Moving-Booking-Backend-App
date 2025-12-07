const express = require("express");
const router = express.Router();
const {
    createShow,
    getAllShows,
    getShowById,
    updateShow,
    deleteShow,
    getShowsByMovie,
    getShowsByTheatre,
    bookSeats
} = require("../controllers/show.controller");
const { validateShowRequest } = require("../middleware/validateShow");
const validateObjectId = require("../middleware/validateObjectId");

router.post("/shows", validateShowRequest, createShow);
router.get("/shows", getAllShows);

// Special routes (must come before :id route)
router.get("/shows/movie/:movieId", getShowsByMovie);
router.get("/shows/theatre/:theatreId", getShowsByTheatre);
router.post("/shows/:showId/book", bookSeats);

router.get("/shows/:id", validateObjectId, getShowById);
router.put("/shows/:id", validateObjectId, validateShowRequest, updateShow);
router.delete("/shows/:id", validateObjectId, deleteShow);

module.exports = router;
