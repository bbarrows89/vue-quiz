// Base API Configuration

import axios from 'axios'

export const API = axios.create({
  baseURL: '//opentdb.com/api.php?'
})

API.interceptors.request.use(function (config) {
  // Set common parameters for each request to the API.
  return config
}, function (error) {
  return Promise.reject(error)
})
