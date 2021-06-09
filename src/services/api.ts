import axios from 'axios';

const api = axios.create({
  baseURL: 'http://68.183.97.199'
})

export default api;