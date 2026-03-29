import axios from "axios";

export const fetchDataFromAPI = async (url) => {
  try {
    const { data } = await axios.get(import.meta.env.VITE_API_URL + url);
    return data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const deleteData = async (url) => {
  try {
    const response = await axios.delete(import.meta.env.VITE_API_URL + url);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postData = async (url, data) => {
  try {
    const response = await axios.post(import.meta.env.VITE_API_URL + url, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/product/${id}`,
    );
    return data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
