import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  withCredentials: false,
});

export default api;
