import axiosInstance from "../utils/axiosInstance";

async function fetchRounds() {
  try {
    const response = await axiosInstance.get("/rounds");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export default {
  getAllRounds: fetchRounds,
};