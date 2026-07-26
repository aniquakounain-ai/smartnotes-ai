import axios from "axios";

const api = axios.create({
  baseURL: baseURL: "https://smartnotes-ai-del3.onrender.com/api",
});

export default api;