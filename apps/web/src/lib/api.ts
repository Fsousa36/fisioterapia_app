const publicApiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "/api";
const serverApiBaseUrl =
  process.env.API_INTERNAL_URL ?? (publicApiBaseUrl.startsWith("http") ? publicApiBaseUrl : "http://localhost:3333");

export function getApiBaseUrl() {
  return typeof window === "undefined" ? serverApiBaseUrl : publicApiBaseUrl;
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
