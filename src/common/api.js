// Base API Configuration

import axios from 'axios'

export const API = axios.create({
  baseURL: '//https://opentdb.com/api.php?amount=10'
})

API.interceptors.request.use(function (config) {
    // Set common parameters for each request to the API.
  return config;
}, function (error) {
  return Promise.reject(error);
});
