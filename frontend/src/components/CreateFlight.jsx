import React, { useState } from "react";
import axios from "axios";

const CreateFlight = () => {
  const [flightData, setFlightData] = useState({
    flightName: "",
    departureAirport: "",
    arrivalAirport: "",
    departureTime: "",
    arrivalTime: "",
    availableSeats: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData({
      ...flightData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/flights", flightData);
      alert(response.data.message);
      setFlightData({
        flightName: "",
        departureAirport: "",
        arrivalAirport: "",
        departureTime: "",
        arrivalTime: "",
        availableSeats: 0,
      });
    } catch (error) {
      console.error("Error creating flight:", error);
    }
  };

  return (
    <div>
      <h1>Create New Flight</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Flight Name:
          <input
            type="text"
            name="flightName"
            value={flightData.flightName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Departure Airport:
          <input
            type="text"
            name="departureAirport"
            value={flightData.departureAirport}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Arrival Airport:
          <input
            type="text"
            name="arrivalAirport"
            value={flightData.arrivalAirport}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Departure Time:
          <input
            type="datetime-local"
            name="departureTime"
            value={flightData.departureTime}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Arrival Time:
          <input
            type="datetime-local"
            name="arrivalTime"
            value={flightData.arrivalTime}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Available Seats:
          <input
            type="number"
            name="availableSeats"
            value={flightData.availableSeats}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Create Flight</button>
      </form>
    </div>
  );
};

export default CreateFlight;
