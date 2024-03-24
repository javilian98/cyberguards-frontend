import axios from "axios";

export const axiosBFFService = axios.create({
  baseURL: import.meta.env.VITE_BFF_SERVICE_URL,
});
