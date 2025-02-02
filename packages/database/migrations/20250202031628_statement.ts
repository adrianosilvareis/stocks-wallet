import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("statement", (table) => {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table.uuid("wallet_id").notNullable().references("id").inTable("wallet");
    table.decimal("amount").notNullable();
    table
      .enu("type", ["deposit", "withdraw", "yield"], {
        useNative: true,
        enumName: "statement_type"
      })
      .notNullable();
    table.timestamp("created_at", { precision: 6 }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("statement");
}
