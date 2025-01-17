import { RootState, store } from '@/redux/store';
import axios from 'axios'
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

const apiBackend = Platform.OS === "android"
  ? process.env.EXPO_PUBLIC_ANDROID_API_URL
  : process.env.EXPO_PUBLIC_IOS_API_URL

const instance = axios.create({
  baseURL: apiBackend,
});


// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = store.getState().user.token;
  config.headers["Authorization"] = `Bearer ${token}`
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  if (error?.response?.data) return error?.response?.data;
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default instance;