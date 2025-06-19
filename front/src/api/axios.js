// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', //Cambiar con el puerto propio
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
