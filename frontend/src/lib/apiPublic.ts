import axios from 'axios';

export const apiPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND,
  withCredentials: true,
});
