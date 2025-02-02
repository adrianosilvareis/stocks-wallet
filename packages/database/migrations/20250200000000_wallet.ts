import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("wallet", (table) => {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.decimal("amount").notNullable();
    table.decimal("allocated_amount").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("wallet");
}
