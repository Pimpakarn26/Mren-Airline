import React, { useEffect, useState } from "react";
import axios from "axios";

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null); // To store the error message

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("/api/flights");

        // Ensure that the response has flights data
        if (response.data && Array.isArray(response.data.flights)) {
          setFlights(response.data.flights);
        } else {
          setError("No flights available.");
        }
      } catch (error) {
        console.error("Error fetching flights:", error);
        setError("Failed to load flights. Please try again.");
      }
    };

    fetchFlights();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

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
