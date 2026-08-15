import {
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

const verifyMock = jest.fn();

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    verify: verifyMock,
  },
}));

const { default: auth } = await import("./auth.js");

describe("auth middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      headers: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  test("returns 401 when no authorization header is provided", () => {
    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "No token provided",
    });

    expect(next).not.toHaveBeenCalled();
  });

  test("returns 401 when the token is invalid", () => {
    req.headers.authorization = "Bearer invalid-token";

    verifyMock.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    auth(req, res, next);

    expect(verifyMock).toHaveBeenCalledWith(
      "invalid-token",
      process.env.JWT_SECRET
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid token",
    });

    expect(next).not.toHaveBeenCalled();
  });

  test("accepts a valid token and attaches decoded user", () => {
    const decodedUser = {
      id: 1,
      email: "admin@example.com",
      role: "admin",
    };

    req.headers.authorization = "Bearer valid-token";

    verifyMock.mockReturnValue(decodedUser);

    auth(req, res, next);

    expect(verifyMock).toHaveBeenCalledWith(
      "valid-token",
      process.env.JWT_SECRET
    );

    expect(req.user).toEqual(decodedUser);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
