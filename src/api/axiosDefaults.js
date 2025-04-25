import axios from "axios";

// Create axios instance and export it for use in other components

const api = axios.create({
    // Left blank to respect the proxy url
    baseURL: "",
    headers: { post: { "Content-Type": "application/json" } },
  withCredentials: true,
})

export default api;