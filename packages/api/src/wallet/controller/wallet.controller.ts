import { HttpResponse } from "@stocks/core";
import { Repository } from "@stocks/database";
import { Wallet } from "@stocks/models";

export const walletImpl = async (_context: unknown, deps: { repository: Repository<Wallet> }) => {
  const { repository }= deps
  const result = await repository.findAll();
  if (result.isLeft()) {
    return HttpResponse.internalServerError(result.value.message);
  }
  return HttpResponse.ok(result.value);
};
