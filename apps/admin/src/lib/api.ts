import axios from "axios";

const publicApiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "/api";
const serverApiBaseUrl =
  process.env.API_INTERNAL_URL ?? (publicApiBaseUrl.startsWith("http") ? publicApiBaseUrl : "http://localhost:3333");

export function getApiBaseUrl() {
  return typeof window === "undefined" ? serverApiBaseUrl : publicApiBaseUrl;
}

export const api = axios.create({
  baseURL: getApiBaseUrl()
});

export const apiBaseUrl = getApiBaseUrl();
