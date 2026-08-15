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

jest.unstable_mockModule("../middleware/auth.js", () => ({
  default: (req, res, next) => {
    if (req.headers.authorization === "Bearer valid-token") {
      req.user = {
        id: 1,
        email: "admin@example.com",
        role: "admin",
      };
      return next();
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  },
}));

const { default: db } = await import("../config/db.js");
const { default: router } = await import("./admin.js");

const express = (await import("express")).default;
const request = (await import("supertest")).default;

const app = express();
app.use("/api/admin", router);

describe("GET /api/admin/messages", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns 401 when authentication fails", async () => {
    const response = await request(app)
      .get("/api/admin/messages")
      .set("Authorization", "Bearer invalid-token");

    expect(response.statusCode).toBe(401);

    expect(response.body).toEqual({
      success: false,
      message: "Invalid token",
    });

    expect(db.query).not.toHaveBeenCalled();
  });

  test("returns all messages for an authenticated admin", async () => {
    const messages = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        message: "Hello",
        created_at: "2026-08-14T10:00:00.000Z",
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "jane@example.com",
        message: "Hi",
        created_at: "2026-08-14T09:00:00.000Z",
      },
    ];

    db.query.mockImplementation((sql, callback) => {
      callback(null, messages);
    });

    const response = await request(app)
      .get("/api/admin/messages")
      .set("Authorization", "Bearer valid-token");

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      success: true,
      messages,
    });

    expect(db.query).toHaveBeenCalledWith(
      "SELECT * FROM messages ORDER BY created_at DESC",
      expect.any(Function)
    );
  });

  test("returns 500 when database query fails", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    db.query.mockImplementation((sql, callback) => {
      callback(new Error("Database failure"));
    });

    const response = await request(app)
      .get("/api/admin/messages")
      .set("Authorization", "Bearer valid-token");

    expect(response.statusCode).toBe(500);

    expect(response.body).toEqual({
      success: false,
      message: "Database error",
    });

    expect(db.query).toHaveBeenCalledWith(
      "SELECT * FROM messages ORDER BY created_at DESC",
      expect.any(Function)
    );

    consoleErrorSpy.mockRestore();
  });
});
