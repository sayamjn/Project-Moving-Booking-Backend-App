const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Movie name is required"],
            trim: true,
            minlength: [1, "Movie name must be at least 1 character"],
            maxlength: [200, "Movie name cannot exceed 200 characters"],
            index: true
        },
        description: {
            type: String,
            required: [true, "Movie description is required"],
            trim: true,
            minlength: [10, "Description must be at least 10 characters"],
            maxlength: [2000, "Description cannot exceed 2000 characters"]
        },
        casts: {
            type: [String],
            required: [true, "At least one cast member is required"],
            validate: {
                validator: function (arr) {
                    return arr && arr.length > 0;
                },
                message: "At least one cast member is required"
            }
        },
        trailerUrl: {
            type: String,
            required: [true, "Trailer URL is required"],
            trim: true,
            validate: {
                validator: function (url) {
                    return /^https?:\/\/.+/.test(url);
                },
                message: "Please provide a valid URL"
            }
        },
        language: {
            type: String,
            required: [true, "Language is required"],
            trim: true,
            default: "English",
            enum: {
                values: [
                    "English",
                    "Hindi",
                    "Tamil",
                    "Telugu",
                    "Malayalam",
                    "Kannada",
                    "Bengali",
                    "Marathi",
                    "Punjabi",
                    "Other"
                ],
                message: "{VALUE} is not a supported language"
            }
        },
        releaseDate: {
            type: Date,
            required: [true, "Release date is required"],
            index: true
        },
        releaseStatus: {
            type: String,
            required: [true, "Release status is required"],
            default: "RELEASED",
            enum: {
                values: ["UPCOMING", "RELEASED", "DELAYED", "CANCELLED"],
                message: "{VALUE} is not a valid release status"
            },
            uppercase: true
        },
        director: {
            type: String,
            required: [true, "Director name is required"],
            trim: true,
            minlength: [2, "Director name must be at least 2 characters"],
            maxlength: [100, "Director name cannot exceed 100 characters"],
            index: true
        },
        rating: {
            type: Number,
            min: [0, "Rating cannot be less than 0"],
            max: [10, "Rating cannot be more than 10"],
            default: null
        },
        duration: {
            type: Number,
            min: [1, "Duration must be at least 1 minute"],
            default: null
        },
        genre: {
            type: [String],
            enum: {
                values: [
                    "Action",
                    "Comedy",
                    "Drama",
                    "Horror",
                    "Romance",
                    "Thriller",
                    "Sci-Fi",
                    "Fantasy",
                    "Documentary",
                    "Animation",
                    "Crime",
                    "Mystery",
                    "Adventure",
                    "Biography",
                    "Musical",
                    "War",
                    "Western",
                    "Other"
                ],
                message: "{VALUE} is not a valid genre"
            },
            default: []
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Compound indexes for better query performance
movieSchema.index({ name: 1, releaseDate: -1 });
movieSchema.index({ director: 1, releaseDate: -1 });
movieSchema.index({ releaseStatus: 1, releaseDate: -1 });

// Virtual for formatted release date
movieSchema.virtual("formattedReleaseDate").get(function () {
    return this.releaseDate ? this.releaseDate.toISOString().split("T")[0] : null;
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;