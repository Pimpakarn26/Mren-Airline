const express = require("express");
const router = express.Router();
const flightController = require("../controllers/fligth.controller");

// Create a new flight
router.post("/", flightController.createFlight);

// Get all flights
router.get("/", flightController.getAllFlights);

// Get a flight by ID
router.get("/:flightId", flightController.getFlightById);

// Update a flight by ID
router.put("/:flightId", flightController.updateFlight);

// Delete a flight by ID
router.delete("/:flightId", flightController.deleteFlight);

module.exports = router;
