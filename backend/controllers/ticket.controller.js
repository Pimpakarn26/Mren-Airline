const TicketModel = require("../models/Ticket.model"); // Assuming the Ticket model is in models/Ticket.js
const FlightModel = require("../models/Flight.model"); // Assuming you have a Flight model
const UserModel = require("../models/user.model"); // Assuming you have a User model
require("dotenv").config();

// Create a ticket
exports.createTicket = async (req, res) => {
  try {
    const { flightId, userId, seatNumber, ticketPrice, ticketNumber } =
      req.body;

    // Validate if flight and user exist
    const flight = await FlightModel.findById(flightId);
    if (!flight) return res.status(404).json({ message: "Flight not found" });

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create new ticket
    const newTicket = new TicketModel({
      flightId,
      userId,
      seatNumber,
      ticketPrice,
      ticketNumber,
    });

    // Save ticket
    await newTicket.save();
    res
      .status(201)
      .json({ message: "Ticket created successfully", ticket: newTicket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tickets for a user
exports.getUserTickets = async (req, res) => {
  try {
    const { userId } = req.params;

    const tickets = await TicketModel.find({ userId }).populate(
      "flightId userId",
      "flightNumber fullName"
    );

    if (tickets.length === 0) {
      return res
        .status(404)
        .json({ message: "No tickets found for this user" });
    }

    res.status(200).json({ tickets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tickets for a flight
exports.getFlightTickets = async (req, res) => {
  try {
    const { flightId } = req.params;

    const tickets = await TicketModel.find({ flightId }).populate(
      "userId",
      "fullName"
    );

    if (tickets.length === 0) {
      return res
        .status(404)
        .json({ message: "No tickets found for this flight" });
    }

    res.status(200).json({ tickets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single ticket by ticket number
exports.getTicketByNumber = async (req, res) => {
  try {
    const { ticketNumber } = req.params;

    const ticket = await TicketModel.findOne({ ticketNumber }).populate(
      "flightId userId",
      "flightNumber fullName"
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
