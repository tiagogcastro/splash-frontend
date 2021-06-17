import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.lavimco.com'
})

export default api;