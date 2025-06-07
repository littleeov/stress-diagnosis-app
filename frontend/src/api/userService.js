import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Получить профиль пользователя (или компании)
export const fetchUserProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// Обновить профиль пользователя (или компании)
export const updateUserProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}/profile`, profileData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

