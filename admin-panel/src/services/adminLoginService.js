import axiosInstance from '../utils/axiosInstance';

const API_URL = '/admin-login';

export async function adminLogin(email, password) {
  try {
    const response = await axiosInstance.post(API_URL, { email, password }  );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}