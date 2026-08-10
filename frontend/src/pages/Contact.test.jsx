import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import Contact from "./Contact";

vi.mock("axios");

describe("Contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders the contact form", () => {
    render(<Contact />);

    expect(
      screen.getByRole("heading", { name: "Contact Me" })
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Your Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Your Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Your Message")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Send Message" })
    ).toBeInTheDocument();
  });

  test("allows the user to enter contact information", async () => {
    const user = userEvent.setup();

    render(<Contact />);

    const name = screen.getByLabelText("Your Name");
    const email = screen.getByLabelText("Your Email");
    const message = screen.getByLabelText("Your Message");

    await user.type(name, "John Doe");
    await user.type(email, "john@example.com");
    await user.type(message, "Hello from the contact form.");

    expect(name).toHaveValue("John Doe");
    expect(email).toHaveValue("john@example.com");
    expect(message).toHaveValue("Hello from the contact form.");
  });

  test("does not submit when required fields are empty", async () => {
    const user = userEvent.setup();

    render(<Contact />);

    await user.click(
      screen.getByRole("button", { name: "Send Message" })
    );

    expect(axios.post).not.toHaveBeenCalled();
  });

  test("does not submit an invalid email address", async () => {
    const user = userEvent.setup();

    render(<Contact />);

    await user.type(screen.getByLabelText("Your Name"), "John Doe");
    await user.type(screen.getByLabelText("Your Email"), "invalid-email");
    await user.type(
      screen.getByLabelText("Your Message"),
      "Test message"
    );

    await user.click(
      screen.getByRole("button", { name: "Send Message" })
    );

    expect(axios.post).not.toHaveBeenCalled();
  });

  test("submits the correct payload", async () => {
    const user = userEvent.setup();

    axios.post.mockResolvedValue({
      data: {
        message: "Message received",
      },
    });

    render(<Contact />);

    await user.type(screen.getByLabelText("Your Name"), "John Doe");
    await user.type(
      screen.getByLabelText("Your Email"),
      "john@example.com"
    );
    await user.type(
      screen.getByLabelText("Your Message"),
      "Hello from the contact form."
    );

    await user.click(
      screen.getByRole("button", { name: "Send Message" })
    );

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/api/contact", {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello from the contact form.",
      });
    });
  });

  test("shows a submitting state while the request is pending", async () => {
    const user = userEvent.setup();

    let resolveRequest;

    axios.post.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRequest = resolve;
        })
    );

    render(<Contact />);

    await user.type(screen.getByLabelText("Your Name"), "John Doe");
    await user.type(
      screen.getByLabelText("Your Email"),
      "john@example.com"
    );
    await user.type(
      screen.getByLabelText("Your Message"),
      "Test message"
    );

    const submitButton = screen.getByRole("button", {
      name: "Send Message",
    });

    await user.click(submitButton);

    expect(
      screen.getByRole("button", { name: "Sending..." })
    ).toBeDisabled();

    resolveRequest({
      data: {
        message: "Message received",
      },
    });

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Send Message" })
      ).toBeEnabled();
    });
  });

  test("shows a success message and clears the form after submission", async () => {
    const user = userEvent.setup();

    axios.post.mockResolvedValue({
      data: {
        message: "Message received",
      },
    });

    render(<Contact />);

    const name = screen.getByLabelText("Your Name");
    const email = screen.getByLabelText("Your Email");
    const message = screen.getByLabelText("Your Message");

    await user.type(name, "John Doe");
    await user.type(email, "john@example.com");
    await user.type(message, "Hello from the contact form.");

    await user.click(
      screen.getByRole("button", { name: "Send Message" })
    );

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent("Message sent successfully.");

    expect(name).toHaveValue("");
    expect(email).toHaveValue("");
    expect(message).toHaveValue("");
  });

  test("shows an error and preserves form data when submission fails", async () => {
    const user = userEvent.setup();

    axios.post.mockRejectedValue(new Error("Network error"));

    vi.spyOn(console, "error").mockImplementation(() => {});

    render(<Contact />);

    const name = screen.getByLabelText("Your Name");
    const email = screen.getByLabelText("Your Email");
    const message = screen.getByLabelText("Your Message");

    await user.type(name, "John Doe");
    await user.type(email, "john@example.com");
    await user.type(message, "Test message");

    await user.click(
      screen.getByRole("button", { name: "Send Message" })
    );

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent(
      "Failed to send message. Please try again."
    );

    expect(name).toHaveValue("John Doe");
    expect(email).toHaveValue("john@example.com");
    expect(message).toHaveValue("Test message");

    expect(
      screen.getByRole("button", { name: "Send Message" })
    ).toBeEnabled();
  });
});
