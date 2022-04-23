import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-easysupport.azurewebsites.net/api/',
});
