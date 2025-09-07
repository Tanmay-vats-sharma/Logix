import axiosInstance from "../utils/axiosInstance";

export const registerStudent = async (formData) => {
  const { data } = await axiosInstance.post("/students/register", formData);
  return data;
};
