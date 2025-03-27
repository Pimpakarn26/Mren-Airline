const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const flightSchema = new mongoose.Schema({
  flightName: { type: String, required: true },
  departureAirport: { type: String, required: true },
  arrivalAirport: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  availableSeats: { type: Number, required: true },
});

const FlightModel = model("Flight", flightSchema);
module.exports = FlightModel;
