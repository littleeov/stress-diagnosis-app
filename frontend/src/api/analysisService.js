import axios from 'axios';

const API_URL = 'http://localhost:5000/stress';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
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

