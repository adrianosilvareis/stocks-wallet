import { HttpResponse } from "@stocks/core";
import { Repository, connection } from "@stocks/database";
import { Wallet } from "@stocks/models";
import { Router } from "express";
import { Surface } from "./Surface";

class WalletRepository extends Repository<Wallet> {
  constructor() {
    super(connection, "wallet");
  }
}

const walletImpl = async (_context: unknown, _deps: unknown) => {
  return HttpResponse.ok({ success: true });
};

export function setup(router: Router) {
  Surface.test.registerExpressHandler<unknown, unknown, unknown>(
    router,
    walletImpl,
    {
      repository: new WalletRepository()
    }
  );
}
