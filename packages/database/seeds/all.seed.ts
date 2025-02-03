import {
  Assets,
  assetsMock,
  Orders,
  orderssMock,
  Statement,
  statementMock,
  Wallet,
  walletsMock
} from "@stocks/models";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("statement").del();
  await knex("orders").del();
  await knex("wallet").del();
  await knex("assets").del();

  // Inserts seed entries
  await knex<Assets>("assets").insert(assetsMock);
  await knex<Wallet>("wallet").insert(walletsMock);
  await knex<Orders>("orders").insert(orderssMock);
  await knex<Statement>("statement").insert(statementMock);
}
