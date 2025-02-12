import { Repository } from "@stocks/database";
import { wallet, Wallet } from "@stocks/models";
import { Router } from "express";
import { Surface } from "./Surface";
import { walletImpl } from "./controller/wallet.controller";

const deps = {
  repository: new Repository<Wallet>(wallet.tableName)
};

export function setup(router: Router) {
  Surface.wallets.registerExpressHandler<
    unknown,
    Wallet[],
    { repository: Repository<Wallet> }
  >(router, walletImpl, deps);
}
