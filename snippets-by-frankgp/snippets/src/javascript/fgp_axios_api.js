import axios from 'axios';

const API = axios.create({
  baseURL: '${1:http://localhost:3000/api}',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${2:your_token}`
  }
});

export async function fetchData(endpoint = '/example') {
  try {
    const response = await API.get(endpoint);
    console.log('✅ Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching data:', error);
    throw error;
  }
}
