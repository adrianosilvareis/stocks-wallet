import { Assets, assetsMock } from "@stocks/models";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("assets").del();

  // Inserts seed entries
  await knex<Assets>("assets").insert(assetsMock);
}
