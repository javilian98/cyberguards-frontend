import axios from "axios";

export const axiosBFFService = axios.create({
  baseURL: import.meta.env.BFF_SERVICE_URL,
});
