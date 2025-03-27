const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ticketSchema = new mongoose.Schema({
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seatNumber: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  ticketNumber: { type: String, required: true },
});

const TicketModel = model("Ticket", ticketSchema);
module.exports = TicketModel;
