const express = require("express");
const router = express.Router();
const {
    createTheatre,
    getAllTheatres,
    getTheatreById,
    updateTheatre,
    deleteTheatre,
    getTheatresByCity
} = require("../controllers/theatre.controller");
const { validateTheatreRequest } = require("../middleware/validateTheatre");
const validateObjectId = require("../middleware/validateObjectId");

router.post("/theatres", validateTheatreRequest, createTheatre);
router.get("/theatres", getAllTheatres);
router.get("/theatres/city/:city", getTheatresByCity);
router.get("/theatres/:id", validateObjectId, getTheatreById);
router.put("/theatres/:id", validateObjectId, validateTheatreRequest, updateTheatre);
router.delete("/theatres/:id", validateObjectId, deleteTheatre);

module.exports = router;
