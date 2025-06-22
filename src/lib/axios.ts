// src/lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080", // URL da sua API Spring
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
