// Base API Configuration

import axios from 'axios';

export const API = axios.create({
    baseURL: '//https://opentdb.com/api.php?amount=10'
});

API.interceptors.request.use(function (config) {
    // Set common parameters for each request to the API.

    // config.params.APPID = '3e29e0b0c6882a3b0947e866c5289ea1';
    // config.params.units = 'imperial';

    return config;
}, function (error) {
    return Promise.reject(error);
});