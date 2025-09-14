import axiosInstance from "../utils/axiosInstance";

export const getSubmissions = async () => {
  try {
    const res = await axiosInstance.get("/submissions");
    return res.data;
  } catch (err) {
    console.error("Error fetching submissions:", err);
    throw err.response?.data || { message: "Server error" };
  }
};  

export const updateCorrectSubmission = async (id, correctSubmission) => {
  try {
    const res = await axiosInstance.put(`/submissions/${id}`, { correctSubmission });
    return res.data;
  } catch (err) {
    console.error("Error updating submission:", err);
    throw err.response?.data || { message: "Server error" };
  }
};