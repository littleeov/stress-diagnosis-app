import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

export const fetchUserProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`, { withCredentials: true });
  return response.data;
};

export const updateUserProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}/profile`, profileData, { withCredentials: true });
  return response.data;
};

export const saveAssessment = async (data) => {
  const response = await axios.post(`${API_URL}/assessments`, data, { withCredentials: true });
  return response.data;
};

export const fetchLastAssessment = async () => {
  const response = await axios.get(`${API_URL}/assessments/last`, { withCredentials: true });
  return response.data;
};

export const fetchAssessments = async () => {
  const response = await axios.get(`${API_URL}/assessments`, { withCredentials: true });
  return response.data;
};

export const fetchCompanyStats = async () => {
  const response = await axios.get(`${API_URL}/company/stats`, { withCredentials: true });
  return response.data;
};


