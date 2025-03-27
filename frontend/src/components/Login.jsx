import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      return Swal.fire("Error", "Email and password are required", "error");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/signin",
        formData
      );

      Swal.fire("Success", response.data.message, "success").then(() => {
        // Redirect to the flight list page after successful login
        navigate("/flight");
      });
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="card p-6 shadow-xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
