import { Knex } from "knex";
import { orderssMock } from "../mocks/orders.mock";
import { Orders } from "../src/models/orders.scheme";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("orders").del();

  // Inserts seed entries
  await knex<Orders>("orders").insert(orderssMock);
}
