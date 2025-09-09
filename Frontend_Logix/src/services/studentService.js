import axiosInstance from "../utils/axiosInstance";

// Register a new team
export const registerStudent = async (formData) => {
  try {
    // Attach password automatically = leader's roll number
    const payload = {
      ...formData,
      password: formData.leaderRollNumber, // ✅ Leader's roll number is password
    };

    const { data } = await axiosInstance.post("/students/register", payload);
    return data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Something went wrong while registering" }
    );
  }
};

export const loginStudent = async (formData) => {
  const { data } = await axiosInstance.post("/students/login", formData);
  return data;
};