import React, { useState } from "react";
import "./Registration.css";
import logixLogo from "../../../assets/logix.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerStudent } from "../../../services/studentService";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    branch: "",
    year: "",
    section: "",
    phoneNumber: "",
    personalEmail: "",
    participantType: "individual",
    eventId: "",
  });

  const [errors, setErrors] = useState({});

  // Field-level validation
  const validateField = (name, value) => {
    let error = "";
    if (name === "name") {
      if (!value) error = "Full name is required";
      else if (!/^[A-Za-z\s]+$/.test(value)) error = "Name must only contain letters";
    }

    if (name === "rollNumber") {
      if (!value) error = "Roll number is required";
      else if (!/^\d{13}$/.test(value)) error = "Roll number must be exactly 13 digits";
    }

    if (name === "branch" && !value) error = "Branch is required";
    if (name === "year" && !value) error = "Year is required";
    if (name === "section" && !value) error = "Section is required";
    if (name === "phoneNumber" && !/^\d{10}$/.test(value)) error = "Valid 10-digit phone number required";

    if (name === "personalEmail") {
      if (!value) error = "Personal email is required";
      else if (!/\S+@\S+\.\S+/.test(value)) error = "Valid personal email required";
    }

    return error;
  };

  // Handle form field changes with live validation
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });

    const error = validateField(name, newValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const keys = [
      "name",
      "rollNumber",
      "branch",
      "year",
      "section",
      "phoneNumber",
      "personalEmail",
    ];
    let newErrors = {};
    keys.forEach((k) => {
      const err = validateField(k, formData[k]);
      if (err) newErrors[k] = err;
    });

    // (terms checkbox removed)

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // // sanitize teamName before submitting
      // const sanitizedData = {
      //   ...formData,
      //   teamName: formData.teamName.replace(/\s+/g, "").toLowerCase(),
      // };

      const response = await registerStudent(formData);
      toast.success(response.message || "Registration successful!");
      navigate("/event-details");
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.message || "Something went wrong!");
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
        <h2>Individual Registration</h2>

        <form noValidate onSubmit={handleSubmit}>
          {[
            { label: "Full Name", name: "name", type: "text" },
            { label: "Roll Number", name: "rollNumber", type: "text" },
            {
              label: "Branch",
              name: "branch",
              type: "select",
              options: ["CSE", "IT", "ECE", "EE", "ME", "CE", "CSE DS", "CSE AIML", "CSE IOT", "CS"],
            },
            {
              label: "Year",
              name: "year",
              type: "select",
              options: [
                { label: "1st Year", value: "1" },
                { label: "2nd Year", value: "2" },
                { label: "3rd Year", value: "3" },
                { label: "4th Year", value: "4" },
              ],
            },
            { label: "Section", name: "section", type: "text" },
            { label: "Phone Number", name: "phoneNumber", type: "tel" },
            { label: "Personal Email", name: "personalEmail", type: "email" },
          ].map((field, idx) => (
            <div className="form-group" key={idx}>
              <label>{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={errors[field.name] ? "error" : ""}
                >
                  <option value="">{field.name === "branch" ? "Select Branch" : "Select Year"}</option>
                  {field.options.map((opt) => (
                    <option
                      key={typeof opt === "string" ? opt : opt.value}
                      value={typeof opt === "string" ? opt : opt.value}
                    >
                      {typeof opt === "string" ? opt : opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={errors[field.name] ? "error" : ""}
                />
              )}
              {errors[field.name] && (
                <span className="error-text">{errors[field.name]}</span>
              )}
            </div>
          ))}

          {/* terms checkbox removed */}

          <div className="step-buttons">
            <button type="submit" className="submit-btn">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
