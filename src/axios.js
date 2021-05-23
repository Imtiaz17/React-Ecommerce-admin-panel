
import axios from 'axios';
import {getCookie} from './utils/auth';
const api = axios.create({
    baseURL: 'http://localhost:3000/api/'
});
const token = getCookie('token');

api.interceptors.request.use(
    config => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
    return config;
    },
    error => Promise.reject(error)
  );
  
export default api;

