import { createRequest, HttpMethod } from "@stocks/core";

export const Surface = {
  wallets: createRequest("/api/wallets", HttpMethod.GET)
};

export const getProxy = Surface.wallets.execute;
