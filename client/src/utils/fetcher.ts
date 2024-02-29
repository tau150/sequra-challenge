export enum HttpMethod {
  POST = "POST",
  PUT = "PUT",
  GET = "GET",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

interface RequestOptions {
  method?: HttpMethod;
  headers?: HeadersInit;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}

export default async function fetcher<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  const url = `${import.meta.env.VITE_BASE_HOST}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    ...(options?.body && { body: JSON.stringify(options.body) }),
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return data;
}
