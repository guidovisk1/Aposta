import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-easysupport.azurewebsites.net/api/',
  headers: {
    token: `Bearer ${localStorage.getItem('@GOIT:token') as string}`,
  },
});
