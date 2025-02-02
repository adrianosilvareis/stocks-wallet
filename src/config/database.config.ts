import { Knex } from "knex";
import { Connector } from "./connector";

export class Repository<S extends object> {
  private readonly connector: Connector;

  constructor(private readonly tableName: string) {
    this.connector = new Connector();
  }

  async getQueryBuilder<QueryBuilder = Knex.QueryBuilder<S>>(): Promise<{
    query: QueryBuilder;
    knex: Knex;
  }> {
    const knex = await this.connector.connect();

    const result = {
      query: knex.withSchema(this.tableName).table(this.tableName),
      knex: knex
    };

    return result as { query: QueryBuilder; knex: Knex };
  }
}
