import React, { useState } from "react";
import "./Registration.css";
import logixLogo from "../../../assets/logix.png";
import { toast } from "react-toastify";
import { registerStudent } from "../../../services/studentService";
const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    branch: "",
    phoneNumber: "",
    collegeEmail: "",
    personalEmail: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate Form Fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.rollNumber) newErrors.rollNumber = "Roll number is required";
    if (!formData.branch) newErrors.branch = "Branch is required";

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (!formData.collegeEmail) {
      newErrors.collegeEmail = "College email is required";
    } else if (!formData.collegeEmail.endsWith("@rkgit.edu.in")) {
      newErrors.collegeEmail = "College email must end with @rkgit.edu.in";
    }

    if (!formData.personalEmail) {
      newErrors.personalEmail = "Personal email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.personalEmail)) {
      newErrors.personalEmail = "Personal email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler (No API, No Console)
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const response = await registerStudent(formData); // ✅ Only pass formData
    toast.success(response.message || "Registration successful!");
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong!");
  }
};


  return (
    <div className="registration-container">
      <div className="background-animation">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>

      <div className="registration-card flex flex-col items-center">
        <img src={logixLogo} alt="Logix Logo" className="h-20 w-32" />
        <h2>Student Registration</h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* Roll Number */}
          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number</label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className={errors.rollNumber ? "error" : ""}
            />
            {errors.rollNumber && (
              <span className="error-text">{errors.rollNumber}</span>
            )}
          </div>

          {/* Branch */}
          <div className="form-group">
            <label htmlFor="branch">Branch</label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className={errors.branch ? "error" : ""}
            >
              <option value="">Select Branch</option>
              <option value="CSE">Computer Science & Engineering</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">Electronics & Communication Engineering</option>
              <option value="EE">Electrical Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="CE">Civil Engineering</option>
            </select>
            {errors.branch && (
              <span className="error-text">{errors.branch}</span>
            )}
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? "error" : ""}
            />
            {errors.phoneNumber && (
              <span className="error-text">{errors.phoneNumber}</span>
            )}
          </div>

          {/* College Email */}
          <div className="form-group">
            <label htmlFor="collegeEmail">College Email</label>
            <input
              type="email"
              id="collegeEmail"
              name="collegeEmail"
              value={formData.collegeEmail}
              onChange={handleChange}
              className={errors.collegeEmail ? "error" : ""}
            />
            {errors.collegeEmail && (
              <span className="error-text">{errors.collegeEmail}</span>
            )}
          </div>

          {/* Personal Email */}
          <div className="form-group">
            <label htmlFor="personalEmail">Personal Email</label>
            <input
              type="email"
              id="personalEmail"
              name="personalEmail"
              value={formData.personalEmail}
              onChange={handleChange}
              className={errors.personalEmail ? "error" : ""}
            />
            {errors.personalEmail && (
              <span className="error-text">{errors.personalEmail}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn z-[9999]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
