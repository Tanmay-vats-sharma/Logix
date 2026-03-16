import axiosInstance from "../utils/axiosInstance";

// Register a new team
export const registerStudent = async (formData) => {
  try {
    // Expect formData to contain individual student fields
    const payload = {
      name: formData.name,
      rollNumber: formData.rollNumber,
      branch: formData.branch,
      year: formData.year,
      section: formData.section,
      phoneNumber: formData.phoneNumber,
      personalEmail: formData.personalEmail,
      participantType: formData.participantType || "individual",
      eventId: formData.eventId,
    };

    const { data } = await axiosInstance.post("/students/register/student", payload);
    return data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Something went wrong while registering" }
    );
  }
};

export const loginStudent = async (formData) => {
  const { data } = await axiosInstance.post("/students/login/student", formData);
  return data;
};