import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx"; // Your App component
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
