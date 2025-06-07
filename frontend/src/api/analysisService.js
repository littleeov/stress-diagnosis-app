import axios from 'axios';

const API_URL = 'http://localhost:5000/stress';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Получить последний результат диагностики стресса пользователя
export const fetchLastStressResult = async () => {
  const response = await axios.get(`${API_URL}/stress/last`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// Получить статистику стрессов (для пользователя или компании)
export const fetchStressStatistics = async () => {
  const response = await axios.get(`${API_URL}/stress/statistics`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// Отправка ответов на вопросы для диагностики
export const sendAnalysisAnswers = async (answers) => {
  const response = await axios.post(
    `${API_URL}/diagnose`,
    { answers },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

