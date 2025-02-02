import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("assets", (table) => {
    table.string("code").notNullable().primary();
    table.string("name").notNullable();
    table.enu("type", ["Ações", "FIIs", "Crypto", "Tesouro Direto"], {
      useNative: true,
      enumName: "assets_type"
    });
    table.timestamp("created_at", { precision: 6 }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("assets");
}
