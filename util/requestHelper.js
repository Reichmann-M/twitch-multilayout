import axios from 'axios';

const BASE_URL = 'http://localhost:9999/api'; // Replace with your API base URL

// Function to make a GET request
export const getRequest = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('GET Request Error:', error);
    throw error;
  }
};

// Function to make a POST request
export const postRequest = async (endpoint, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('POST Request Error:', error);
    throw error;
  }
};