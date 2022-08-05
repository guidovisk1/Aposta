import axios from 'axios';

const token = localStorage.getItem('@GOIT:token');

export const api = axios.create({
  baseURL: 'http://easysupport-v0-dev.us-east-1.elasticbeanstalk.com/api',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
    // This code above prevents API calling without the header/token right set
  },
});
