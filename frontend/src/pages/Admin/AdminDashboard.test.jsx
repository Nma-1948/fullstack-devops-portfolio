import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import AdminDashboard from "./AdminDashboard";

describe("AdminDashboard", () => {
  test("renders the dashboard heading and welcome message", () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: "Dashboard" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /Welcome back, Administrator/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Manage your website from the administration panel.")
    ).toBeInTheDocument();
  });

  test("renders the Messages administration links", () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    const messageLinks = screen.getAllByRole("link", {
      name: /Messages/i,
    });

    expect(messageLinks.length).toBeGreaterThanOrEqual(2);

    messageLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/admin/messages");
    });
  });

  test("renders the View Website link pointing to the homepage", () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    const websiteLinks = screen.getAllByRole("link", {
      name: /View Website/i,
    });

    expect(websiteLinks.length).toBeGreaterThanOrEqual(1);

    websiteLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/");
    });
  });

  test("displays Security and System operational status", () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText("Security")).toBeInTheDocument();
    expect(screen.getByText("JWT authentication is protecting the administration area.")).toBeInTheDocument();
    expect(screen.getByText("Protected")).toBeInTheDocument();

    expect(screen.getByText("System")).toBeInTheDocument();
    expect(screen.getByText("Backend and administration services are configured.")).toBeInTheDocument();
    expect(screen.getByText("Operational")).toBeInTheDocument();
  });
});
