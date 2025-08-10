import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getAllProducts = async () => {
  const res = await axios.get(`${API_URL}products`);
  return res.data;
};

export const deleteProductById = async (id) => {
  const res = await axios.delete(`${API_URL}products/${id}`);
  return res.data;
};

export const scrapeProductsByQuery = async (q) => {
  const res = await axios.post(`${API_URL}search/${q}`);
  return res.data;
};
