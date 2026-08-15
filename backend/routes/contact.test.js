import {
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

jest.unstable_mockModule("../controllers/contactController.js", () => ({
  sendMessage: jest.fn((req, res) => {
    res.status(200).json({
      success: true,
      message: "Controller called",
    });
  }),
}));

const { default: router } = await import("./contact.js");

const express = (await import("express")).default;
const request = (await import("supertest")).default;

const app = express();
app.use(express.json());
app.use("/api/contact", router);

describe("POST /api/contact", () => {
  test("routes the request to sendMessage controller", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "John Doe",
        email: "john@example.com",
        message: "Hello",
      });

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      success: true,
      message: "Controller called",
    });
  });
});
