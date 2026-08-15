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

jest.unstable_mockModule("bcryptjs", () => ({
  default: {
    hashSync: jest.fn(() => "hashed-password"),
  },
}));

const { default: db } = await import("../config/db.js");
const { default: bcrypt } = await import("bcryptjs");
const { default: router } = await import("./register.js");

function getHandler() {
  return router.stack.find(
    (layer) => layer.route?.path === "/"
  ).route.stack[0].handle;
}

const handler = getHandler();

function createResponse() {
  return {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };
}

describe("POST /api/register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns error when required fields are missing", async () => {
    const req = {
      body: {
        name: "",
        email: "",
        password: "",
      },
    };

    const res = createResponse();

    await handler(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "All fields are required",
    });

    expect(db.query).not.toHaveBeenCalled();
  });

  test("returns database error when checking for existing user fails", async () => {
    const req = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      },
    };

    const res = createResponse();

    db.query.mockImplementation((sql, values, callback) => {
      callback(new Error("Database failure"));
    });

    await handler(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Database error",
    });
  });

  test("returns error when user already exists", async () => {
    const req = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      },
    };

    const res = createResponse();

    db.query.mockImplementation((sql, values, callback) => {
      callback(null, [
        {
          id: 1,
          email: "john@example.com",
        },
      ]);
    });

    await handler(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User already exists",
    });

    expect(bcrypt.hashSync).not.toHaveBeenCalled();
  });

  test("returns registration error when inserting user fails", async () => {
    const req = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      },
    };

    const res = createResponse();

    db.query
      .mockImplementationOnce((sql, values, callback) => {
        callback(null, []);
      })
      .mockImplementationOnce((sql, values, callback) => {
        callback(new Error("Insert failed"));
      });

    await handler(req, res);

    expect(bcrypt.hashSync).toHaveBeenCalledWith(
      "password123",
      10
    );

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Registration failed",
    });
  });

  test("registers a new user successfully", async () => {
    const req = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      },
    };

    const res = createResponse();

    db.query
      .mockImplementationOnce((sql, values, callback) => {
        callback(null, []);
      })
      .mockImplementationOnce((sql, values, callback) => {
        callback(null, {
          insertId: 1,
        });
      });

    await handler(req, res);

    expect(bcrypt.hashSync).toHaveBeenCalledWith(
      "password123",
      10
    );

    expect(db.query).toHaveBeenNthCalledWith(
      1,
      "SELECT * FROM users WHERE email = ?",
      ["john@example.com"],
      expect.any(Function)
    );

    expect(db.query).toHaveBeenNthCalledWith(
      2,
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [
        "John Doe",
        "john@example.com",
        "hashed-password",
      ],
      expect.any(Function)
    );

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "User registered successfully",
    });
  });
});
