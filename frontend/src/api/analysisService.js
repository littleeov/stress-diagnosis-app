import axios from 'axios';

const API_URL = 'http://localhost:5000/stress';

// Отправка текста и ответов на вопросы для анализа
export const analyzeText = async (textData) => {
  const response = await axios.post(`${API_URL}/stress`, textData, { withCredentials: true });
  return response.data;
};
