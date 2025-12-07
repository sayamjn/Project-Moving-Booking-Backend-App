const mongoose = require("mongoose")

const connectDb =  async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to mongoDb")
    } catch (error) {
        console.log("Error connecting to mongoDb, Error: ", error)
    }
}

module.exports = connectDb