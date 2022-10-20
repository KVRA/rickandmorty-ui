import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RICK_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
