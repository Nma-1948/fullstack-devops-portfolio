import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import axios from "axios";
import Contact from "./Contact";

vi.mock("axios");

test("renders the contact form", () => {
  render(<Contact />);

  expect(screen.getByRole("heading", { name: "Contact Me" })).toBeInTheDocument();

  expect(screen.getByPlaceholderText("Your Name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Your Email")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Your Message")).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: "Send Message" })
  ).toBeInTheDocument();
});

test("allows the user to fill the contact form", async () => {
  const user = userEvent.setup();

  render(<Contact />);

  const name = screen.getByPlaceholderText("Your Name");
  const email = screen.getByPlaceholderText("Your Email");
  const message = screen.getByPlaceholderText("Your Message");

  await user.type(name, "John Doe");
  await user.type(email, "john@example.com");
  await user.type(message, "Hello, I would like to contact you.");

  expect(name).toHaveValue("John Doe");
  expect(email).toHaveValue("john@example.com");
  expect(message).toHaveValue("Hello, I would like to contact you.");
});

test("submits the contact form successfully", async () => {
  const user = userEvent.setup();

  axios.post.mockResolvedValue({
    data: {
      message: "Message received"
    }
  });

  const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

  render(<Contact />);

  await user.type(
    screen.getByPlaceholderText("Your Name"),
    "John Doe"
  );

  await user.type(
    screen.getByPlaceholderText("Your Email"),
    "john@example.com"
  );

  await user.type(
    screen.getByPlaceholderText("Your Message"),
    "Hello from the contact form."
  );

  await user.click(
    screen.getByRole("button", { name: "Send Message" })
  );

  expect(axios.post).toHaveBeenCalledWith("/api/contact", {
    name: "John Doe",
    email: "john@example.com",
    message: "Hello from the contact form."
  });

  expect(alertMock).toHaveBeenCalledWith(
    "Message sent successfully ✅"
  );

  expect(screen.getByPlaceholderText("Your Name")).toHaveValue("");
  expect(screen.getByPlaceholderText("Your Email")).toHaveValue("");
  expect(screen.getByPlaceholderText("Your Message")).toHaveValue("");

  alertMock.mockRestore();
});

test("shows an error when contact submission fails", async () => {
  const user = userEvent.setup();

  axios.post.mockRejectedValue(new Error("Network error"));

  const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});

  render(<Contact />);

  await user.type(
    screen.getByPlaceholderText("Your Name"),
    "John Doe"
  );

  await user.type(
    screen.getByPlaceholderText("Your Email"),
    "john@example.com"
  );

  await user.type(
    screen.getByPlaceholderText("Your Message"),
    "Test message"
  );

  await user.click(
    screen.getByRole("button", { name: "Send Message" })
  );

  expect(alertMock).toHaveBeenCalledWith(
    "Failed to send message ❌"
  );

  alertMock.mockRestore();
});
