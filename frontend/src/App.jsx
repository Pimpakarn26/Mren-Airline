import React from "react";
import { Routes, Route } from "react-router-dom"; // Import necessary routing components
import SignupForm from "./components/Signup"; // Import Signup component
import Login from "./components/Login"; // Import Login component
import FlightList from "./components/FlightList";
import CreateFlight from "./components/CreateFlight";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/flights" element={<FlightList />} />
      <Route path="/create-flight" element={<CreateFlight />} />
    </Routes>
  );
}

export default App;
