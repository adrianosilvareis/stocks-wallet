import { Orders, orderssMock } from "@stocks/models";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("orders").del();

  // Inserts seed entries
  await knex<Orders>("orders").insert(orderssMock);
}
