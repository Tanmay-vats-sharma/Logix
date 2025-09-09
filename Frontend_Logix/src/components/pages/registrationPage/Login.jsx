import React, { useState } from "react";
import "./Registration.css"; // Reusing the same CSS and animations
import logixLogo from "../../../assets/logix.png";
import { toast } from "react-toastify";
import { loginStudent } from "../../../services/studentService";

const Login = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    leaderRollNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.teamName) {
      newErrors.teamName = "Team name is required";
    }

    if (!formData.leaderRollNumber) {
      newErrors.leaderRollNumber = "Leader roll number is required";
    } else if (!/^[0-9]+$/.test(formData.leaderRollNumber)) {
      newErrors.leaderRollNumber = "Roll number must be numeric";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Update your API call to match new structure
      const response = await loginStudent(formData);
      toast.success(response.message || "Login successful!");

      // Optionally store token
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      setFormData({
        teamName: "",
        leaderRollNumber: "",
      });
    } catch (error) {
      toast.error(error.message || "Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container w-[55svw]">
      {/* Background animation */}
      <div className="background-animation">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>

      {/* Login card */}
      <div className="registration-card flex flex-col items-center w-[45svw]">
        <img src={logixLogo} alt="Logix Logo" className="h-24 w-44" />
        <h2>Team Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Team Name */}
          <div className="form-group w-[25svw]">
            <label htmlFor="teamName">Team Name</label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              className={errors.teamName ? "error w-14" : ""}
            />
            {errors.teamName && (
              <span className="error-text">{errors.teamName}</span>
            )}
          </div>

          {/* Leader Roll Number (Password) */}
          <div className="form-group">
            <label htmlFor="leaderRollNumber">Leader Roll Number</label>
            <input
              type="password"
              id="leaderRollNumber"
              name="leaderRollNumber"
              value={formData.leaderRollNumber}
              onChange={handleChange}
              className={errors.leaderRollNumber ? "error" : ""}
            />
            {errors.leaderRollNumber && (
              <span className="error-text">{errors.leaderRollNumber}</span>
            )}
          </div>

          {/* Submit button */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
