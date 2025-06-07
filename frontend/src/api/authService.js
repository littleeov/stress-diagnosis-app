import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // замените на ваш URL

// Получаем токен из localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Регистрация пользователя или компании
export const register = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

// Вход пользователя
export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Выход пользователя
export const logout = () => {
  localStorage.removeItem('token');
};

// Получение информации о текущем пользователе
export const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

