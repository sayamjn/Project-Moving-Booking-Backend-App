require("dotenv").config();
const express = require("express");
const connectDb = require("./config/database");
const movieRoutes = require("./routes/movie.routes");
const theatreRoutes = require("./routes/theatre.routes");
const showRoutes = require("./routes/show.routes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

const app = express();

connectDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.use("/api/v1", movieRoutes);
app.use("/api/v1", theatreRoutes);
app.use("/api/v1", showRoutes);

app.get("/home", (req, res) => {
    return res.json({
        success: true,
        message: "Server is running"
    });
});

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});