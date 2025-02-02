import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("orders", (table) => {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table.string("code").notNullable().references("code").inTable("assets");
    table.uuid("wallet_id").notNullable().references("id").inTable("wallet");
    table.integer("quantity").notNullable();
    table.decimal("price").notNullable();
    table
      .enum("type", ["buy", "sell"], {
        useNative: true,
        enumName: "order_type"
      })
      .notNullable();
    table.timestamp("created_at", { precision: 6 }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("orders");
}
