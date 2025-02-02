import knex from "knex";

export class Connector {
  async connect() {
    return knex({
      client: "sqlite3",
      connection: {
        filename: "./dev.sqlite3"
      },
      useNullAsDefault: true
    });
  }
}
