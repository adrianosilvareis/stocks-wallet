import { Either, left, QueryExecutionError, right } from "@stocks/core";
import { Knex } from "knex";
import { QueryBuilder } from "./QueryBuilder";
import { connection } from "./connection";

export class Repository<T> {
  protected tableName: string;
  protected queryBuilder: QueryBuilder;

  constructor(tableName: Symbol, protected readonly knex: Knex = connection) {
    this.tableName = tableName.description || tableName.toString();
    this.queryBuilder = new QueryBuilder(knex, this.tableName);
  }

  query(): QueryBuilder {
    return this.queryBuilder.clone();
  }

  async findAll(): Promise<Either<Error, T[]>> {
    try {
      const result = await this.query().get<T>();
      return right(result);
    } catch (error) {
      return left(new QueryExecutionError("findAll", error));
    }
  }

  async findById(id: number | string): Promise<Either<Error, T | undefined>> {
    try {
      const result = await this.query().where("id", "=", id).first<T>();
      return right(result);
    } catch (error) {
      return left(new QueryExecutionError("findById", error));
    }
  }

  async create(data: Partial<T>): Promise<Either<Error, number[]>> {
    try {
      const result = await this.query().insert<T>(data);
      return right(result);
    } catch (error) {
      return left(new QueryExecutionError("create", error));
    }
  }

  async update(
    id: number | string,
    data: Partial<T>
  ): Promise<Either<Error, number>> {
    try {
      const result = await this.query().where("id", "=", id).update<T>(data);
      return right(result);
    } catch (error) {
      return left(new QueryExecutionError("update", error));
    }
  }

  async delete(id: number | string): Promise<Either<Error, number>> {
    try {
      const result = await this.query().where("id", "=", id).delete();
      return right(result);
    } catch (error) {
      return left(new QueryExecutionError("delete", error));
    }
  }
}
