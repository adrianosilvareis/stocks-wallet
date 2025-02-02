import { Knex } from "knex";
import { Assets } from "src/models/assets.scheme";
import { assetsMock } from "../mocks/assets.mock";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("assets").del();

  // Inserts seed entries
  await knex<Assets>("assets").insert(assetsMock);
}
