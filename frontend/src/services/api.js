import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDishes = async () => {
  try {
    const response = await api.get('/dishes');
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch dishes. Please try again.'
    );
  }
};

export const togglePublishStatus = async (dishId) => {
  try {
    const response = await api.patch(`/dishes/${dishId}/toggle`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || `Failed to update status for dish #${dishId}.`
    );
  }
};

export default api;
