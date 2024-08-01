import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.example.com", // 替换为你的API基础路径
  timeout: 60000, // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 可以在这里添加授权token等
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 统一错误处理
    return Promise.reject(error);
  }
);

export default instance;
