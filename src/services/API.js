/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
const API_KEY = '29703536-3492bea623abb7896113a32cf';

export const fetchImg = async (searchQuery, page) => {
  const axiosUrl = `?q=${searchQuery}&page=${page}&key=${API_KEY}&per_page=12&image_type=photo&orientation=horizontal`
  const response = await axios.get(axiosUrl);
  return response.data;
};


export default {
  fetchImg,
};



