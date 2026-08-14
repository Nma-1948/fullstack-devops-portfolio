import {
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

jest.unstable_mockModule("../config/db.js", () => ({
  default: {
    query: jest.fn(),
  },
}));

const { default: db } = await import("../config/db.js");
const { sendMessage } = await import("./contactController.js");

describe("sendMessage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("saves a contact message successfully", () => {
    const req = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello from the contact form.",
      },
    };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    db.query.mockImplementation((sql, values, callback) => {
      callback(null, {
        insertId: 1,
      });
    });

    sendMessage(req, res);

    expect(db.query).toHaveBeenCalledWith(
      "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
      [
        "John Doe",
        "john@example.com",
        "Hello from the contact form.",
      ],
      expect.any(Function)
    );

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Message saved successfully",
    });
  });

  test("returns 500 when database insertion fails", () => {
    const req = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        message: "Test message",
      },
    };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    db.query.mockImplementation((sql, values, callback) => {
      callback(new Error("Database connection failed"));
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    sendMessage(req, res);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
    });

    consoleErrorSpy.mockRestore();
  });
});
