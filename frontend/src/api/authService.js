import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const register = async (userData) => {
  return axios.post(`${API_URL}/auth/register`, userData);
};

export const login = async (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials);
};
