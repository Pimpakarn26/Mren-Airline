const FlightModel = require("../models/Flight.model"); // Assuming the Flight model is in models/Flight.js
require("dotenv").config();

// Create a flight
exports.createFlight = async (req, res) => {
  try {
    const {
      flightName,
      departureAirport,
      arrivalAirport,
      departureTime,
      arrivalTime,
      availableSeats,
    } = req.body;

    // Create new flight
    const newFlight = new FlightModel({
      flightName,
      departureAirport,
      arrivalAirport,
      departureTime,
      arrivalTime,
      availableSeats,
    });

    // Save flight
    await newFlight.save();
    res
      .status(201)
      .json({ message: "Flight created successfully", flight: newFlight });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all flights
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await FlightModel.find();

    if (flights.length === 0) {
      return res.status(404).json({ message: "No flights found" });
    }

    res.status(200).json({ flights });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get flight details by flight ID
exports.getFlightById = async (req, res) => {
  try {
    const { flightId } = req.params;

    const flight = await FlightModel.findById(flightId);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.status(200).json({ flight });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update flight details
exports.updateFlight = async (req, res) => {
  try {
    const { flightId } = req.params;
    const updates = req.body;

    const flight = await FlightModel.findByIdAndUpdate(flightId, updates, {
      new: true,
    });

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.status(200).json({ message: "Flight updated successfully", flight });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a flight
exports.deleteFlight = async (req, res) => {
  try {
    const { flightId } = req.params;

    const flight = await FlightModel.findByIdAndDelete(flightId);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.status(200).json({ message: "Flight deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
