import axios from 'axios';

const API_URL = 'http://localhost:5000/users'; // Адрес вашего backend для пользователей

// Получение профиля текущего пользователя
export const getProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`, { withCredentials: true });
  return response.data;
};

// Получение истории оценок пользователя
export const getAssessments = async () => {
  const response = await axios.get(`${API_URL}/assessments`, { withCredentials: true });
  return response.data;
};

// Сохранение результатов теста
export const saveAssessment = async (assessmentData) => {
  const response = await axios.post(`${API_URL}/assessments`, assessmentData, { withCredentials: true });
  return response.data;
};

// Обновление профиля пользователя (пример)
export const updateProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}/profile`, profileData, { withCredentials: true });
  return response.data;
};
