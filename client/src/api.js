import axios from 'axios';

const API_URL = 'https://atif-brothers-server-production.up.railway.app/api/auth';

export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/register`, userData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const loginUser = async (credentials) => {
    return await axios.post(`${API_URL}/login`, credentials);
};
