require("dotenv").config()
const express = require("express");
const connectDb = require("./config/database");
const app = express()
const movieRoutes = require("./routes/movie.routes")
connectDb()

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/v1",movieRoutes)

app.get("/home", (req,res) => {
    return res.json({
        sucess: true
    })
})

app.listen(3000,() => {
    console.log("Server is running on port 3000")
})