import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Messages from "./Messages";
import { getMessages } from "../../api/messageApi";

vi.mock("../../api/messageApi", () => ({
  getMessages: vi.fn(),
}));

describe("Messages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("shows loading state while messages are being fetched", () => {
    getMessages.mockReturnValue(new Promise(() => {}));

    render(<Messages />);

    expect(screen.getByText("Loading messages...")).toBeInTheDocument();
  });

  test("displays messages returned by the API", async () => {
    getMessages.mockResolvedValue({
      data: [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          message: "Hello from the contact form.",
          created_at: "2026-08-14T10:00:00.000Z",
        },
      ],
    });

    render(<Messages />);

    expect(
      await screen.findByText("Hello from the contact form.")
    ).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Messages (1)")).toBeInTheDocument();
  });

  test("shows empty state when no messages are returned", async () => {
    getMessages.mockResolvedValue({
      data: [],
    });

    render(<Messages />);

    expect(
      await screen.findByText("No messages found.")
    ).toBeInTheDocument();

    expect(screen.getByText("Messages (0)")).toBeInTheDocument();
  });

  test("handles API failure and stops loading", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    getMessages.mockRejectedValue(new Error("Network failure"));

    render(<Messages />);

    await waitFor(() => {
      expect(
        screen.queryByText("Loading messages...")
      ).not.toBeInTheDocument();
    });

    expect(screen.getByText("No messages found.")).toBeInTheDocument();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching messages:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });
});
