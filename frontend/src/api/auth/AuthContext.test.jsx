import { renderHook, act } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { AuthProvider, useAuth } from "./AuthContext";

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("starts with no authenticated user when localStorage is empty", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user).toBeNull();
  });

  test("loads the stored user from localStorage", () => {
    const user = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", "test-token");

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user).toEqual(user);
  });

  test("login stores authentication data and updates the user", () => {
    const user = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    };

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.login({
        user,
        token: "test-token",
      });
    });

    expect(result.current.user).toEqual(user);
    expect(localStorage.getItem("token")).toBe("test-token");
    expect(JSON.parse(localStorage.getItem("user"))).toEqual(user);
  });

  test("logout clears the authenticated user and localStorage", () => {
    const user = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", "test-token");

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user).toEqual(user);

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
  });
});
