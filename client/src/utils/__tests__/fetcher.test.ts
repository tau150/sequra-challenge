import createFetchMock from "vitest-fetch-mock";
import { expect, vi } from "vitest";

import fetcher from "../fetcher";

const fetchMock = createFetchMock(vi);
const BASE_URL = import.meta.env.VITE_BASE_HOST;

beforeAll(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

describe("fetcher function", () => {
  it("fetches data successfully from an API - GET without options", async () => {
    const mockData = { message: "Mock response" };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const url = "/api/data";

    const data = await fetcher(url);

    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(data).toEqual(mockData);
  });

  it("fetches data successfully from an API - GET with additional headers", async () => {
    const mockData = { message: "Mock response" };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const url = "/api/data";
    const options = { headers: { "x-test": "test-value" } };

    const data = await fetcher(url, options);

    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}${url}`, {
      headers: {
        "x-test": "test-value",
        "Content-Type": "application/json",
        "X-Device-Id": process.env.NEXT_PUBLIC_DEVICE_ID,
      },
    });

    expect(data).toEqual(mockData);
  });

  it("fetches data successfully from an API - POST with additional headers and body", async () => {
    const mockData = { message: "Mock response" };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const url = "/api/data";
    const bodyData = { data: "some data" };
    const options = { method: "POST", body: bodyData, headers: { "x-test": "test-value" } };

    const data = await fetcher(url, options as never);

    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}${url}`, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "x-test": "test-value",
        "Content-Type": "application/json",
      },
    });

    expect(data).toEqual(mockData);
  });

  it("throws an error if the API response is not successful", async () => {
    const errorMessage = "Not Found";

    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404, statusText: errorMessage });

    const url = "/api/not-found";

    await expect(fetcher(url)).rejects.toThrow(errorMessage);
  });
});
