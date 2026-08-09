import { describe, expect, test, beforeEach, vi } from "vitest";
import api from "./axios";

describe("API client configuration", () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    Object.defineProperty(globalThis, "localStorage", {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
      configurable: true,
    });
  });

  test("uses the correct API base URL", () => {
    expect(api.defaults.baseURL).toBe(
      "http://52.30.184.176:5000/api"
    );
  });

  test("uses JSON content type", () => {
  expect(api.defaults.headers["Content-Type"]).toBe(
    "application/json"
  );
});

  test("adds Authorization header when token exists", async () => {
    localStorage.getItem.mockReturnValue("test-token");

    const config = await api.interceptors.request.handlers[0].fulfilled({
      headers: {},
    });

    expect(localStorage.getItem).toHaveBeenCalledWith("token");
    expect(config.headers.Authorization).toBe("Bearer test-token");
  });

  test("does not add Authorization header without token", async () => {
    localStorage.getItem.mockReturnValue(null);

    const config = await api.interceptors.request.handlers[0].fulfilled({
      headers: {},
    });

    expect(localStorage.getItem).toHaveBeenCalledWith("token");
    expect(config.headers.Authorization).toBeUndefined();
  });
});
