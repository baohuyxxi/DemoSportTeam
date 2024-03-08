import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});
instance.interceptors.request.use(

  (config) => {
    const token = "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";
    if (token) {
      config.headers["X-Shopify-Access-Token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
