import axios from 'axios';
import { logout } from '../features/authSlice';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
});
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            logout();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
