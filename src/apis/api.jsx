import axios from "axios";

axios.defaults.withCredentials = true;

export const fetchDataFromAPI = async (url) => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || "";
    const response = await axios.get(`${baseUrl}${url}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Không thể kết nối máy chủ.",
    };
  }
};

export const deleteData = async (url) => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || "";
    const response = await axios.delete(`${baseUrl}${url}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Không thể kết nối máy chủ.",
    };
  }
};

export const postData = async (url, data) => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || "";
    const response = await axios.post(`${baseUrl}${url}`, data);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Không thể kết nối máy chủ.",
    };
  }
};

export const fetchProductById = async (id) => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || "";
    const response = await axios.get(`${baseUrl}/product/${id}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Không thể kết nối máy chủ.",
    };
  }
};
