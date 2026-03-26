import axios from "axios";
//const APP_API_URL = "https://backend-e-commerce-naiv.onrender.com/api";
const APP_API_URL = "http://localhost:4000/api";

export const fetchDataFromAPI = async (url) => {
  try {
    console.log(APP_API_URL);
    const { data } = await axios.get(APP_API_URL + url);
    return data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const deleteData = async (url) => {
  try {
    const response = await axios.delete(APP_API_URL + url);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
