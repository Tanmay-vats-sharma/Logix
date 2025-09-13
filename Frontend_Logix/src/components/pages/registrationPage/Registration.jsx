import React, { useState } from "react";
import "./Registration.css";
import logixLogo from "../../../assets/logix.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerStudent } from "../../../services/studentService";

const Registration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    teamName: "",
    leaderName: "",
    leaderRollNumber: "",
    leaderBranch: "",
    leaderSection: "",
    leaderPhoneNumber: "",
    leaderPersonalEmail: "",
    teamMembers: [],
  });

  const [errors, setErrors] = useState({});

  // Field-level validation
  const validateField = (name, value) => {
    let error = "";

    // Leader fields
    if (name === "teamName") {
      if (!value) error = "Team name is required";
      else if (!/^[A-Za-z\s]+$/.test(value))
        error = "Team name must only contain letters and spaces";
    }

    if (name === "leaderName") {
      if (!value) error = "Leader name is required";
      else if (!/^[A-Za-z\s]+$/.test(value))
        error = "Leader name must only contain letters";
    }

    if (name === "leaderRollNumber") {
      if (!value) error = "Leader roll number is required";
      else if (!/^\d{13}$/.test(value))
        error = "Roll number must be exactly 13 digits";
    }

    if (name === "leaderBranch" && !value) error = "Branch is required";
    if (name === "leaderSection" && !value) error = "Section is required";
    if (name === "leaderPhoneNumber" && !/^\d{10}$/.test(value))
      error = "Valid 10-digit phone number required";
    if (name === "leaderPersonalEmail" && !/\S+@\S+\.\S+/.test(value))
      error = "Valid personal email required";

    // Member fields
    if (name === "name") {
      if (!value) error = "Member name is required";
      else if (!/^[A-Za-z\s]+$/.test(value))
        error = "Member name must only contain letters";
    }

    if (name === "rollNumber") {
      if (!value) error = "Member roll number is required";
      else if (!/^\d{13}$/.test(value))
        error = "Roll number must be exactly 13 digits";
    }

    if (name === "branch" && !value) error = "Branch is required";
    if (name === "section" && !value) error = "Section is required";
    if (name === "phoneNumber" && value && !/^\d{10}$/.test(value))
      error = "Valid 10-digit phone number required";
    if (name === "personalEmail" && value && !/\S+@\S+\.\S+/.test(value))
      error = "Valid personal email required";

    return error;
  };

  // Handle form field changes with live validation
  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index === null) {
      setFormData({ ...formData, [name]: value });

      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      const updatedMembers = [...formData.teamMembers];
      updatedMembers[index][name] = value;
      setFormData({ ...formData, teamMembers: updatedMembers });

      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [`${name}-${index}`]: error }));
    }
  };

  // Add new member
  const addMember = () => {
    if (formData.teamMembers.length >= 2) {
      toast.error("A team can have a maximum of 3 members including the leader.");
      return;
    }
    setFormData({
      ...formData,
      teamMembers: [
        ...formData.teamMembers,
        {
          name: "",
          rollNumber: "",
          branch: "",
          section: "",
          phoneNumber: "",
          personalEmail: "",
        },
      ],
    });
  };

  // Remove member
  const removeMember = (index) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers.splice(index, 1);
    setFormData({ ...formData, teamMembers: updatedMembers });
  };

  // Validate duplicates
  const hasDuplicateMembers = () => {
    const rollNumbers = [
      formData.leaderRollNumber,
      ...formData.teamMembers.map((m) => m.rollNumber),
    ].filter(Boolean);

    const emails = [
      formData.leaderCollegeEmail,
      ...formData.teamMembers.map((m) => m.collegeEmail),
    ].filter(Boolean);

    return (
      new Set(rollNumbers).size !== rollNumbers.length ||
      new Set(emails).size !== emails.length
    );
  };

  // Step validation before moving forward
  const validateStep = () => {
    let newErrors = {};
    if (step === 1) {
      Object.keys(formData).forEach((key) => {
        if (key.startsWith("leader")) {
          const error = validateField(key, formData[key]);
          if (error) newErrors[key] = error;
        }
      });
    } else if (step === 2) {
      formData.teamMembers.forEach((member, index) => {
        Object.keys(member).forEach((key) => {
          const error = validateField(key, member[key]);
          if (error) newErrors[`${key}-${index}`] = error;
        });
      });
    }

    if (hasDuplicateMembers()) {
      toast.error("Duplicate roll numbers or emails are not allowed.");
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Next / Prev steps
  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    try {
      // sanitize teamName before submitting
      const sanitizedData = {
        ...formData,
        teamName: formData.teamName.replace(/\s+/g, "").toLowerCase(),
      };

      const response = await registerStudent(sanitizedData);
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
        <h2>Team Registration</h2>

        <form noValidate>
          {/* Step 1: Leader Details */}
          {step === 1 && (
            <>
              <p style={{ color: "#f5b400", marginBottom: "10px" }}>
                Note: Laptop is Mandatory per team
              </p>

              {[
                { label: "Team Name", name: "teamName", type: "text" },
                { label: "Leader Name", name: "leaderName", type: "text" },
                { label: "Leader Roll Number", name: "leaderRollNumber", type: "text" },
                {
                  label: "Branch",
                  name: "leaderBranch",
                  type: "select",
                  options: ["CSE", "IT", "ECE", "EE", "ME", "CE"],
                },
                { label: "Section", name: "leaderSection", type: "text" },
                { label: "Phone Number", name: "leaderPhoneNumber", type: "tel" },
                { label: "Personal Email", name: "leaderPersonalEmail", type: "email" },
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
                      <option value="">Select Branch</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
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
            </>
          )}

          {/* Step 2: Team Members */}
          {step === 2 && (
            <>
              <h3 style={{ color: "#fff", marginBottom: "10px" }}>
                Team Members (Optional)
              </h3>
              {formData.teamMembers.map((member, index) => (
                <div key={index} className="member-card">
                  {[
                    { label: "Name", name: "name", type: "text" },
                    { label: "Roll Number", name: "rollNumber", type: "text" },
                    {
                      label: "Branch",
                      name: "branch",
                      type: "select",
                      options: ["CSE", "IT", "ECE", "EE", "ME", "CE"],
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
                          value={member[field.name]}
                          onChange={(e) => handleChange(e, index)}
                          className={
                            errors[`${field.name}-${index}`] ? "error" : ""
                          }
                        >
                          <option value="">Select Branch</option>
                          {field.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={member[field.name]}
                          onChange={(e) => handleChange(e, index)}
                          className={
                            errors[`${field.name}-${index}`] ? "error" : ""
                          }
                        />
                      )}
                      {errors[`${field.name}-${index}`] && (
                        <span className="error-text">
                          {errors[`${field.name}-${index}`]}
                        </span>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeMember(index)}
                  >
                    Remove Member
                  </button>
                </div>
              ))}

              {formData.teamMembers.length < 2 && (
                <button type="button" className="add-btn" onClick={addMember}>
                  + Add Member
                </button>
              )}
            </>
          )}

          {/* Buttons */}
          <div className="step-buttons">
            {step > 1 && (
              <button type="button" className="prev-btn" onClick={prevStep}>
                Previous
              </button>
            )}
            {step === 1 && (
              <button type="button" className="next-btn" onClick={nextStep}>
                Next
              </button>
            )}
            {step === 2 && (
              <button type="submit" className="submit-btn" onClick={handleSubmit}>
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
