import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-easysupport.azurewebsites.net/api/',
});

export default api;
