const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error.message);
    });

// Appointment Schema
const appointmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String
        },
        date: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        service: {
            type: String,
            required: true
        },
        message: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

// Appointment Model
const Appointment = mongoose.model(
    "Appointment",
    appointmentSchema
);


// Appointment route
app.post("/api/appointments", async (req, res) => {
    try {
        const appointment = new Appointment(req.body);

        await appointment.save();

        console.log("New appointment saved:");
        console.log(appointment);

        res.status(201).json({
            success: true,
            message: "Appointment request saved successfully."
        });

    } catch (error) {
        console.error("Error saving appointment:", error);

        res.status(500).json({
            success: false,
            message: "Unable to save appointment."
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});