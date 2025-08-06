import { env } from "@/env/env";
import axios from "axios";

export const api = axios.create({
    baseURL: env.NEXT_API_URL,
    timeout : 10000
})

api.interceptors.response.use(response => response, error => {
      const messages = error.response?.data?.message || "Erro inesperado";
      return Promise.reject(new Error(messages));
    }
  );