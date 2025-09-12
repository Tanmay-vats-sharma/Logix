import axiosInstance from "../utils/axiosInstance";

export const submitSubmission = async (data) => {
  try {
    const response = await axiosInstance.post('/submission/submit', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
