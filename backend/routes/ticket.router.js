const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");
// Create a new ticket
router.post("/", ticketController.createTicket);

// Get all tickets for a user
router.get("/user/:userId", ticketController.getUserTickets);

// Get all tickets for a flight
router.get("/flight/:flightId", ticketController.getFlightTickets);

// Get a ticket by ticket number
router.get("/:ticketNumber", ticketController.getTicketByNumber);

module.exports = router;
