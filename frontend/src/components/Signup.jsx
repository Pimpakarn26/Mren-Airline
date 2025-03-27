import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullNameTH: "",
    fullNameEN: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullNameTH, fullNameEN, email, phone, password } = formData;

    if (!fullNameTH || !fullNameEN || !email || !phone || !password) {
      return Swal.fire("Error", "All fields are required", "error");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/signup",
        formData
      );
      Swal.fire("Success", response.data.message, "success");
      // Clear form data after successful submission
      setFormData({
        fullNameTH: "",
        fullNameEN: "",
        email: "",
        phone: "",
        password: "",
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
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name (TH)</label>
            <input
              type="text"
              name="fullNameTH"
              value={formData.fullNameTH}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter your full name in Thai"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Full Name (EN)</label>
            <input
              type="text"
              name="fullNameEN"
              value={formData.fullNameEN}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter your full name in English"
            />
          </div>
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
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter your phone number"
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
