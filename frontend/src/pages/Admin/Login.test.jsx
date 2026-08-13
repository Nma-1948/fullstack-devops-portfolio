import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test, vi, beforeEach } from "vitest";
import Login from "./Login";

const mockNavigate = vi.fn();
const mockLogin = vi.fn();
const mockLoginAdmin = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../api/authApi", () => ({
  loginAdmin: (...args) => mockLoginAdmin(...args),
}));

vi.mock("../../api/auth/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

describe("Admin Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLoginAdmin.mockReset();
    mockLogin.mockReset();
    mockNavigate.mockReset();
  });

  test("renders the admin login form", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: "Admin Login" })
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Sign in" })
    ).toBeInTheDocument();
  });

  test("submits credentials, logs in, and navigates to admin dashboard", async () => {
    const responseData = {
      user: {
        id: 1,
        name: "Administrator",
        email: "admin@example.com",
      },
      token: "test-token",
    };

    mockLoginAdmin.mockResolvedValue({
      data: responseData,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "admin@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "secret123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(mockLoginAdmin).toHaveBeenCalledWith({
        email: "admin@example.com",
        password: "secret123",
      });
    });

    expect(mockLogin).toHaveBeenCalledWith(responseData);
    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });

  test("shows loading state while login request is pending", async () => {
    let resolveLogin;

    mockLoginAdmin.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveLogin = resolve;
        })
    );

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "admin@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "secret123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(
      screen.getByRole("button", { name: "Signing in..." })
    ).toBeDisabled();

    resolveLogin({
      data: {
        user: { id: 1 },
        token: "test-token",
      },
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/admin");
    });
  });

  test("shows API error message when login fails", async () => {
    const alertSpy = vi
      .spyOn(window, "alert")
      .mockImplementation(() => {});

    mockLoginAdmin.mockRejectedValue({
      response: {
        data: {
          message: "Invalid email or password",
        },
      },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "admin@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrong-password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Invalid email or password"
      );
    });

    expect(mockLogin).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });
});
