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
    leaderCollegeEmail: "",
    leaderPersonalEmail: "",
    teamMembers: [],
  });

  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index === null) {
      setFormData({ ...formData, [name]: value });
    } else {
      const updatedMembers = [...formData.teamMembers];
      updatedMembers[index][name] = value;
      setFormData({ ...formData, teamMembers: updatedMembers });
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
          collegeEmail: "",
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

  // Validate no duplicate roll numbers or emails
  const hasDuplicateMembers = () => {
    const rollNumbers = [
      formData.leaderRollNumber,
      ...formData.teamMembers.map((m) => m.rollNumber),
    ];
    const emails = [
      formData.leaderCollegeEmail,
      ...formData.teamMembers.map((m) => m.collegeEmail),
    ];
    return (
      new Set(rollNumbers).size !== rollNumbers.length ||
      new Set(emails).size !== emails.length
    );
  };

  // Validate fields for current step
  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.teamName) newErrors.teamName = "Team name is required";
      if (!formData.leaderName) newErrors.leaderName = "Leader name is required";
      if (!formData.leaderRollNumber)
        newErrors.leaderRollNumber = "Leader roll number is required";
      if (!formData.leaderBranch) newErrors.leaderBranch = "Branch is required";
      if (!formData.leaderSection)
        newErrors.leaderSection = "Section is required";
      if (
        !formData.leaderPhoneNumber ||
        !/^\d{10}$/.test(formData.leaderPhoneNumber)
      )
        newErrors.leaderPhoneNumber = "Valid phone number required";
      // if (
      //   !formData.leaderCollegeEmail ||
      //   !formData.leaderCollegeEmail.endsWith("@rkgit.edu.in")
      // )
      //   newErrors.leaderCollegeEmail = "Must be a valid RKGIT email";
      if (
        !formData.leaderPersonalEmail ||
        !/\S+@\S+\.\S+/.test(formData.leaderPersonalEmail)
      )
        newErrors.leaderPersonalEmail = "Personal email is invalid";
    }

    if (step === 2) {
      // formData.teamMembers.forEach((member, index) => {
      //   // Validate only if any field is filled
      //   if (member.name || member.rollNumber || member.collegeEmail) {
      //     if (!member.name) newErrors[`name-${index}`] = "Name is required";
      //     if (!member.rollNumber)
      //       newErrors[`roll-${index}`] = "Roll number is required";
      //     if (!member.branch) newErrors[`branch-${index}`] = "Branch is required";
      //     if (!member.section)
      //       newErrors[`section-${index}`] = "Section is required";
      //     if (!member.phoneNumber || !/^\d{10}$/.test(member.phoneNumber))
      //       newErrors[`phone-${index}`] = "Valid phone number required";
      //     if (
      //       !member.collegeEmail ||
      //       !member.collegeEmail.endsWith("@rkgit.edu.in")
      //     )
      //       newErrors[`college-${index}`] = "Must be a valid RKGIT email";
      //     if (!member.personalEmail || !/\S+@\S+\.\S+/.test(member.personalEmail))
      //       newErrors[`personal-${index}`] = "Personal email invalid";
      //   }
      // });

      if (hasDuplicateMembers()) {
        toast.error("Team members' roll numbers and emails must be unique.");
        return false;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Move to next step
  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  // Move to previous step
  const prevStep = () => setStep(step - 1);

  // Handle submit
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    // if (!validateStep()) return;

    try {
      const response = await registerStudent(formData);
      toast.success(response.message || "Registration successful!");
      navigate("/event-details");
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
        <h2>Team Registration</h2>

        <form noValidate>
          {/* Step 1: Leader Details */}
          {step === 1 && (
            <>
              <p style={{ color: "#f5b400", marginBottom: "10px" }}>
                Note: Laptop is Mandatory per team
              </p>

              <div className="form-group">
                <label>Team Name</label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  className={errors.teamName ? "error" : ""}
                />
                {errors.teamName && (
                  <span className="error-text">{errors.teamName}</span>
                )}
              </div>

              <div className="form-group">
                <label>Leader Name</label>
                <input
                  type="text"
                  name="leaderName"
                  value={formData.leaderName}
                  onChange={handleChange}
                  className={errors.leaderName ? "error" : ""}
                />
                {errors.leaderName && (
                  <span className="error-text">{errors.leaderName}</span>
                )}
              </div>

              <div className="form-group">
                <label>Leader Roll Number</label>
                <input
                  type="text"
                  name="leaderRollNumber"
                  value={formData.leaderRollNumber}
                  onChange={handleChange}
                  className={errors.leaderRollNumber ? "error" : ""}
                />
                {errors.leaderRollNumber && (
                  <span className="error-text">{errors.leaderRollNumber}</span>
                )}
              </div>

              <div className="form-group">
                <label>Branch</label>
                <select
                  name="leaderBranch"
                  value={formData.leaderBranch}
                  onChange={handleChange}
                  className={errors.leaderBranch ? "error" : ""}
                >
                  <option value="">Select Branch</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EE">EE</option>
                  <option value="ME">ME</option>
                  <option value="CE">CE</option>
                </select>
                {errors.leaderBranch && (
                  <span className="error-text">{errors.leaderBranch}</span>
                )}
              </div>

              <div className="form-group">
                <label>Section</label>
                <input
                  type="text"
                  name="leaderSection"
                  value={formData.leaderSection}
                  onChange={handleChange}
                  className={errors.leaderSection ? "error" : ""}
                />
                {errors.leaderSection && (
                  <span className="error-text">{errors.leaderSection}</span>
                )}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="leaderPhoneNumber"
                  value={formData.leaderPhoneNumber}
                  onChange={handleChange}
                  className={errors.leaderPhoneNumber ? "error" : ""}
                />
                {errors.leaderPhoneNumber && (
                  <span className="error-text">
                    {errors.leaderPhoneNumber}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>College Email</label>
                <input
                  type="email"
                  name="leaderCollegeEmail"
                  value={formData.leaderCollegeEmail}
                  onChange={handleChange}
                  className={errors.leaderCollegeEmail ? "error" : ""}
                />
                {errors.leaderCollegeEmail && (
                  <span className="error-text">
                    {errors.leaderCollegeEmail}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Personal Email</label>
                <input
                  type="email"
                  name="leaderPersonalEmail"
                  value={formData.leaderPersonalEmail}
                  onChange={handleChange}
                  className={errors.leaderPersonalEmail ? "error" : ""}
                />
                {errors.leaderPersonalEmail && (
                  <span className="error-text">
                    {errors.leaderPersonalEmail}
                  </span>
                )}
              </div>
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
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={member.name}
                      onChange={(e) => handleChange(e, index)}
                      className={errors[`name-${index}`] ? "error" : ""}
                    />
                    {errors[`name-${index}`] && (
                      <span className="error-text">
                        {errors[`name-${index}`]}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Roll Number</label>
                    <input
                      type="text"
                      name="rollNumber"
                      value={member.rollNumber}
                      onChange={(e) => handleChange(e, index)}
                      className={errors[`roll-${index}`] ? "error" : ""}
                    />
                    {errors[`roll-${index}`] && (
                      <span className="error-text">
                        {errors[`roll-${index}`]}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Branch</label>
                    <select
                      name="branch"
                      value={member.branch}
                      onChange={(e) => handleChange(e, index)}
                      className={errors[`branch-${index}`] ? "error" : ""}
                    >
                      <option value="">Select Branch</option>
                      <option value="CSE">CSE</option>
                      <option value="IT">IT</option>
                      <option value="ECE">ECE</option>
                      <option value="EE">EE</option>
                      <option value="ME">ME</option>
                      <option value="CE">CE</option>
                    </select>
                    {errors[`branch-${index}`] && (
                      <span className="error-text">
                        {errors[`branch-${index}`]}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Section</label>
                    <input
                      type="text"
                      name="section"
                      value={member.section}
                      onChange={(e) => handleChange(e, index)}
                      className={errors[`section-${index}`] ? "error" : ""}
                    />
                    {errors[`section-${index}`] && (
                      <span className="error-text">
                        {errors[`section-${index}`]}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={member.phoneNumber}
                      onChange={(e) => handleChange(e, index)}
                      className={errors[`phone-${index}`] ? "error" : ""}
                    />
                    {errors[`phone-${index}`] && (
                      <span className="error-text">
                        {errors[`phone-${index}`]}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>College Email</label>
                    <input
                      type="email"
                      name="collegeEmail"
                      value={member.collegeEmail}
                      onChange={(e) => handleChange(e, index)}
                      className={errors[`college-${index}`] ? "error" : ""}
                    />
                    {errors[`college-${index}`] && (
                      <span className="error-text">
                        {errors[`college-${index}`]}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Personal Email</label>
                    <input
                      type="email"
                      name="personalEmail"
                      value={member.personalEmail}
                      onChange={(e) => handleChange(e, index)}
                      className={errors[`personal-${index}`] ? "error" : ""}
                    />
                    {errors[`personal-${index}`] && (
                      <span className="error-text">
                        {errors[`personal-${index}`]}
                      </span>
                    )}
                  </div>

                  {index > 0 && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeMember(index)}
                    >
                      Remove Member
                    </button>
                  )}
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
              <>
                <button
                  type="button"
                  className="skip-btn"
                  onClick={handleSubmit}
                >
                  Skip & Register
                </button>
                <button type="submit" className="submit-btn" onClick={handleSubmit}>
                  Register
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
