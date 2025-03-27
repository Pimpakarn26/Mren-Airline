import React, { useEffect, useState } from "react";
import axios from "axios";

const FlightList = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("/api/flights");
        setFlights(response.data.flights);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };
    fetchFlights();
  }, []);

  return (
    <div>
      <h1>Flight List</h1>
      {flights.length === 0 ? (
        <p>No flights available.</p>
      ) : (
        flights.map((flight) => (
          <div key={flight._id} className="card">
            <h3>{flight.flightName}</h3>
            <p>
              {flight.departureAirport} to {flight.arrivalAirport}
            </p>
            <p>Departure: {new Date(flight.departureTime).toLocaleString()}</p>
            <p>Arrival: {new Date(flight.arrivalTime).toLocaleString()}</p>
            <p>Available Seats: {flight.availableSeats}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FlightList;
