import {getSession} from "next-auth/react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api';

export async function authenticatedFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error("No access token available");
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      "Authorization": `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    throw new Error("Authentication required");
  }

  return response;
}

export const api = {
  get: (endpoint: string) =>
    authenticatedFetch(endpoint, {method: "GET"}),

  post: (endpoint: string, data: any) =>
    authenticatedFetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  patch: (endpoint: string, data: any) =>
    authenticatedFetch(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (endpoint: string) =>
    authenticatedFetch(endpoint, {method: "DELETE"}),
};
