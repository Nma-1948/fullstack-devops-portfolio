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
const { default: loginRouter } = await import("./login.js");

import express from "express";
import request from "supertest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());
app.use("/api/login", loginRouter);

describe("POST /api/login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test-secret";
  });

  test("returns error when email or password is missing", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({
        email: "john@example.com",
      });

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      success: false,
      message: "Email and password required",
    });

    expect(db.query).not.toHaveBeenCalled();
  });

  test("returns database error when user lookup fails", async () => {
    db.query.mockImplementation((sql, values, callback) => {
      callback(new Error("Database failure"));
    });

    const response = await request(app)
      .post("/api/login")
      .send({
        email: "john@example.com",
        password: "password123",
      });

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      success: false,
      message: "Database error",
    });
  });

  test("returns user not found when email does not exist", async () => {
    db.query.mockImplementation((sql, values, callback) => {
      callback(null, []);
    });

    const response = await request(app)
      .post("/api/login")
      .send({
        email: "missing@example.com",
        password: "password123",
      });

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      success: false,
      message: "User not found",
    });

    expect(db.query).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE email = ?",
      ["missing@example.com"],
      expect.any(Function)
    );
  });

  test("returns invalid credentials when password is incorrect", async () => {
    const hashedPassword = bcrypt.hashSync(
      "correct-password",
      10
    );

    db.query.mockImplementation((sql, values, callback) => {
      callback(null, [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          password: hashedPassword,
          role: "admin",
        },
      ]);
    });

    const response = await request(app)
      .post("/api/login")
      .send({
        email: "john@example.com",
        password: "wrong-password",
      });

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      success: false,
      message: "Invalid credentials",
    });
  });

  test("logs in successfully and returns a JWT", async () => {
    const hashedPassword = bcrypt.hashSync(
      "correct-password",
      10
    );

    db.query.mockImplementation((sql, values, callback) => {
      callback(null, [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          password: hashedPassword,
          role: "admin",
        },
      ]);
    });

    const response = await request(app)
      .post("/api/login")
      .send({
        email: "john@example.com",
        password: "correct-password",
      });

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Login successful");

    expect(response.body.token).toBeDefined();
    expect(typeof response.body.token).toBe("string");

    expect(response.body.user).toEqual({
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
    });

    const decoded = jwt.verify(
      response.body.token,
      "test-secret"
    );

    expect(decoded.id).toBe(1);
    expect(decoded.email).toBe("john@example.com");
    expect(decoded.role).toBe("admin");
  });
});
