import axios from 'axios';

const API_BASE_URL = 'https://crypto-tracker-6ibo.onrender.com/api';

// const API_BASE_URL = 'http://localhost:5000/api';

export const fetchCoins = async () => {
  const response = await axios.get(`${API_BASE_URL}/coins`);
  return response.data;
};
