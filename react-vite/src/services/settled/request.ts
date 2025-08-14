import axios from 'axios';
import { message } from 'antd';

// 创建 axios 请求实例
const request = axios.create({});

// 创建请求拦截
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    message.error(error?.message);
    Promise.reject(error);
  },
);

// 创建响应拦截
request.interceptors.response.use(
  (res) => {
    // 返回数据
    return res.data;
  },
  (error) => {
    const text = error?.response?.data?.message ?? error?.message;
    message.error(text);
    return Promise.reject(error);
  },
);

export default request;
