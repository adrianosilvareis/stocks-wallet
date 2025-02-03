import { Knex } from "knex";
import { QueryBuilder } from "./QueryBuilder";

export abstract class Repository<T> {
  protected tableName: string;
  protected queryBuilder: QueryBuilder;

  constructor(protected readonly knex: Knex, tableName: string) {
    this.tableName = tableName;
    this.queryBuilder = new QueryBuilder(knex, tableName);
  }

  query(): QueryBuilder {
    return this.queryBuilder.clone();
  }

  async findAll(): Promise<T[]> {
    return this.query().get<T>();
  }

  async findById(id: number | string): Promise<T | undefined> {
    return this.query().where("id", "=", id).first<T>();
  }

  async create(data: Partial<T>): Promise<number[]> {
    return this.query().insert<T>(data);
  }

  async update(id: number | string, data: Partial<T>): Promise<number> {
    return this.query().where("id", "=", id).update<T>(data);
  }

  async delete(id: number | string): Promise<number> {
    return this.query().where("id", "=", id).delete();
  }
}
