import axios from 'axios';

const baseUrl = 'http://localhost:5001';

interface User {
    email: string,
    password: string
}

export const createUser = async (user: User) => {
  const response = await axios.post(`${baseUrl}/signup`, user, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const loginUser = async (user: User) => {
  const response = await axios.post(`${baseUrl}/login`, user, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  
  if (!response.data?.token) {
    throw new Error("UnAuthorized");
  }
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(`${baseUrl}/logout`, {}, {
    withCredentials: true
  });
  return response.data;
};