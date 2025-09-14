import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const API_URL = '/admin-login';

export async function adminLogin(email, password) {
  try {
    const response = await axiosInstance.post(API_URL, { email, password });
    toast.success("Login successful!");
    return response.data;
  } catch (error) {
    toast.error(error.response ? error.response.data : error);
    throw error.response ? error.response.data : error;
  }
}