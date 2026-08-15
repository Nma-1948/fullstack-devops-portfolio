import request from "supertest";
import { jest } from "@jest/globals";

jest.unstable_mockModule("../config/db.js", () => ({
  default: {
    query: jest.fn(),
  },
}));

const { default: db } = await import("../config/db.js");
const { default: app } = await import("../app.js");

describe("Backend API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET / returns backend running message", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Backend running");
  });

  test("GET /api/test401 returns 401", async () => {
    const response = await request(app).get("/api/test401");

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      success: false,
      message: "Unauthorized test",
    });
  });

  test("POST /api/contact saves a contact message", async () => {
    db.query.mockImplementation((sql, values, callback) => {
      callback(null, {
        insertId: 1,
      });
    });

    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "John Doe",
        email: "john@example.com",
        message: "Hello from Jest.",
      });

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      success: true,
      message: "Message saved successfully",
    });

    expect(db.query).toHaveBeenCalledWith(
      "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
      [
        "John Doe",
        "john@example.com",
        "Hello from Jest.",
      ],
      expect.any(Function)
    );
  });

  test("POST /api/contact returns 500 when database fails", async () => {
    db.query.mockImplementation((sql, values, callback) => {
      callback(new Error("Database failure"));
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "John Doe",
        email: "john@example.com",
        message: "This should fail.",
      });

    expect(response.statusCode).toBe(500);

    expect(response.body).toEqual({
      success: false,
    });

    consoleErrorSpy.mockRestore();
  });
});
