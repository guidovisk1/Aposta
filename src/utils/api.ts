import axios from 'axios';

const token = localStorage.getItem('@GOIT:token');

export const api = axios.create({
  baseURL: 'https://api-easysupport.azurewebsites.net/api/',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
    // This code above prevents API calling without the header/token right set
  },
});
