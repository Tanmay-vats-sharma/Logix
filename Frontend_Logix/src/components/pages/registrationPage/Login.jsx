import React, { useState } from "react";
import "./Registration.css";
import logixLogo from "../../../assets/logix.png";
import { toast } from "react-toastify";
import { loginStudent } from "../../../services/studentService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rollNumber: "",
    personalEmail: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false); // ⬅️ for 20s disable

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.rollNumber) {
      newErrors.rollNumber = "Roll number is required";
    } else if (!/^\d{13}$/.test(formData.rollNumber)) {
      newErrors.rollNumber = "Roll number must be exactly 13 digits";
    }

    if (!formData.personalEmail) {
      newErrors.personalEmail = "Personal email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.personalEmail)) {
      newErrors.personalEmail = "Valid personal email required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setCooldown(true); // ⬅️ immediately disable for 20s

    // Reset cooldown after 20 seconds
    setTimeout(() => {
      setCooldown(false);
    }, 10000);

    try {
      const payload = {
        rollNumber: formData.rollNumber,
        personalEmail: formData.personalEmail,
      };

      const response = await loginStudent(payload);
      toast.success(response.message || "Login successful!");
      localStorage.setItem("student", JSON.stringify(response));

      navigate("/event-day");

      setFormData({ rollNumber: "", personalEmail: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container w-[55svw]">
      <div className="background-animation">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>

      <div className="registration-card flex flex-col items-center w-[45svw]">
        <img src={logixLogo} alt="Logix Logo" className="h-24 w-44" />
        <h2>Student Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group w-[25svw]">
            <label htmlFor="rollNumber">Roll Number</label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className={errors.rollNumber ? "error w-14" : ""}
            />
            {errors.rollNumber && (
              <span className="error-text">{errors.rollNumber}</span>
            )}
          </div>

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

          <button
            type="submit"
            className="submit-btn"
            disabled={loading || cooldown}
          >
            {loading
              ? "Logging in..."
              : cooldown
              ? "Please wait 10s..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
