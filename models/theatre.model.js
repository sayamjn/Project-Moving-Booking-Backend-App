const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Theatre name is required"],
            trim: true,
            minlength: [2, "Theatre name must be at least 2 characters"],
            maxlength: [100, "Theatre name cannot exceed 100 characters"],
            index: true
        },
        address: {
            street: {
                type: String,
                required: [true, "Street address is required"],
                trim: true
            },
            city: {
                type: String,
                required: [true, "City is required"],
                trim: true,
                index: true
            },
            state: {
                type: String,
                required: [true, "State is required"],
                trim: true
            },
            zipCode: {
                type: String,
                required: [true, "Zip code is required"],
                trim: true
            },
            country: {
                type: String,
                required: true,
                trim: true,
                default: "India"
            }
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point"
            },
            coordinates: {
                type: [Number],
                default: [0, 0]
            }
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
            validate: {
                validator: function (phone) {
                    return /^[0-9]{10}$/.test(phone);
                },
                message: "Please provide a valid 10-digit phone number"
            }
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            validate: {
                validator: function (email) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                },
                message: "Please provide a valid email address"
            }
        },
        screens: {
            type: Number,
            required: [true, "Number of screens is required"],
            min: [1, "Theatre must have at least 1 screen"],
            max: [50, "Number of screens cannot exceed 50"]
        },
        facilities: {
            type: [String],
            enum: {
                values: [
                    "Parking",
                    "Food Court",
                    "Wheelchair Access",
                    "3D",
                    "IMAX",
                    "Dolby Atmos",
                    "Recliner Seats",
                    "Online Booking",
                    "M-Ticket",
                    "Cafe"
                ],
                message: "{VALUE} is not a valid facility"
            },
            default: []
        },
        owner: {
            type: String,
            required: [true, "Owner name is required"],
            trim: true
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

// Geospatial index for location-based queries
theatreSchema.index({ location: "2dsphere" });

// Compound indexes
theatreSchema.index({ "address.city": 1, isActive: 1 });
theatreSchema.index({ name: 1, "address.city": 1 });

// Virtual for full address
theatreSchema.virtual("fullAddress").get(function () {
    return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}, ${this.address.country}`;
});

const Theatre = mongoose.model("Theatre", theatreSchema);

module.exports = Theatre;
