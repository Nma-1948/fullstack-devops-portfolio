import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test, beforeEach } from "vitest";
import ProtectedRoute from "./ProtectedRoute";

describe("ProtectedRoute", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("does not render protected content without a token", () => {
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <ProtectedRoute>
          <div>Protected Dashboard</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText("Protected Dashboard")).not.toBeInTheDocument();
  });

  test("renders protected content when a token exists", () => {
    localStorage.setItem("token", "test-token");

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <ProtectedRoute>
          <div>Protected Dashboard</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Dashboard")).toBeInTheDocument();
  });

  test("does not render protected content when the token is removed", () => {
    localStorage.setItem("token", "test-token");

    const { rerender } = render(
      <MemoryRouter initialEntries={["/admin/messages"]}>
        <ProtectedRoute>
          <div>Protected Messages</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Messages")).toBeInTheDocument();

    localStorage.removeItem("token");

    rerender(
      <MemoryRouter initialEntries={["/admin/messages"]}>
        <ProtectedRoute>
          <div>Protected Messages</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText("Protected Messages")).not.toBeInTheDocument();
  });
});
