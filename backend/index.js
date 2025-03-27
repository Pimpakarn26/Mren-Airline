const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./routes/user.router");
const flightRouter = require("./routes/flight.router");
const ticketRouter = require("./routes/ticket.router");

const FRONTEND_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

// Create app
const app = express();

try {
  mongoose.connect(DB_URL);
  console.log("connect to mongo db successfully");
} catch (error) {
  console.log("connect failed " + error);
}

// Allow web access
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Nakhon Pathom Airline</h1>");
});

app.use("/api/v1/auth", authRouter);
// Flight and ticket routes
app.use("/api/v1/flight", flightRouter); // Use the flight routes under `/api/v1/flights`
app.use("/api/v1/ticket", ticketRouter); // Use the ticket routes under `/api/v1/tickets`

// Start server
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
