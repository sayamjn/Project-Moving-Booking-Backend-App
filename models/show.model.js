const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
    {
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
            required: [true, "Movie is required"],
            index: true
        },
        theatre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Theatre",
            required: [true, "Theatre is required"],
            index: true
        },
        screenNumber: {
            type: Number,
            required: [true, "Screen number is required"],
            min: [1, "Screen number must be at least 1"]
        },
        showDate: {
            type: Date,
            required: [true, "Show date is required"],
            index: true
        },
        showTime: {
            type: String,
            required: [true, "Show time is required"],
            validate: {
                validator: function (time) {
                    return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
                },
                message: "Show time must be in HH:MM format (24-hour)"
            }
        },
        pricing: {
            standard: {
                type: Number,
                required: [true, "Standard pricing is required"],
                min: [0, "Price cannot be negative"]
            },
            premium: {
                type: Number,
                min: [0, "Price cannot be negative"],
                default: null
            },
            recliner: {
                type: Number,
                min: [0, "Price cannot be negative"],
                default: null
            }
        },
        totalSeats: {
            type: Number,
            required: [true, "Total seats is required"],
            min: [1, "Total seats must be at least 1"]
        },
        availableSeats: {
            type: Number,
            required: true,
            min: [0, "Available seats cannot be negative"]
        },
        bookedSeats: {
            type: [String],
            default: []
        },
        showType: {
            type: String,
            enum: {
                values: ["2D", "3D", "IMAX", "4DX", "Dolby Atmos"],
                message: "{VALUE} is not a valid show type"
            },
            default: "2D"
        },
        language: {
            type: String,
            required: [true, "Language is required"],
            trim: true
        },
        status: {
            type: String,
            enum: {
                values: ["SCHEDULED", "ONGOING", "COMPLETED", "CANCELLED"],
                message: "{VALUE} is not a valid status"
            },
            default: "SCHEDULED",
            uppercase: true
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

// Compound indexes for common queries
showSchema.index({ movie: 1, showDate: 1 });
showSchema.index({ theatre: 1, showDate: 1 });
showSchema.index({ showDate: 1, status: 1 });
showSchema.index({ movie: 1, theatre: 1, showDate: 1 });

// Virtual for occupancy percentage
showSchema.virtual("occupancyPercentage").get(function () {
    if (this.totalSeats === 0) return 0;
    return ((this.totalSeats - this.availableSeats) / this.totalSeats * 100).toFixed(2);
});

// Virtual for show datetime
showSchema.virtual("showDateTime").get(function () {
    if (!this.showDate || !this.showTime) return null;
    const date = new Date(this.showDate);
    const [hours, minutes] = this.showTime.split(":");
    date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return date;
});

const Show = mongoose.model("Show", showSchema);

module.exports = Show;
