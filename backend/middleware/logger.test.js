import {
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import {
  accessLogger,
  errorLogger,
} from "./logger.js";

describe("logger middleware", () => {
  test("creates access logger with info level", () => {
    expect(accessLogger).toBeDefined();
    expect(accessLogger.level).toBe("info");
  });

  test("creates error logger with error level", () => {
    expect(errorLogger).toBeDefined();
    expect(errorLogger.level).toBe("error");
  });

  test("accessLogger.stream.write trims the message and logs it", () => {
    const infoSpy = jest
      .spyOn(accessLogger, "info")
      .mockImplementation(() => {});

    accessLogger.stream.write("  test access log message  \n");

    expect(infoSpy).toHaveBeenCalledWith("test access log message");

    infoSpy.mockRestore();
  });
});
