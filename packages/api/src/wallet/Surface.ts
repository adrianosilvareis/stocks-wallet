import { createRequest, HttpMethod } from "@stocks/core";

export const Surface = {
  test: createRequest("/api/test", HttpMethod.GET).withBody({ name: "Test" })
};

export const getProxy = Surface.test.execute;
