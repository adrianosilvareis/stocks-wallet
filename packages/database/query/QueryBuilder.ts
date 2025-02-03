import { Knex } from "knex";

export class QueryBuilder {
  private query: Knex.QueryBuilder;

  constructor(private knex: Knex, tableName: string) {
    this.query = knex(tableName);
  }

  // Métodos básicos
  select(columns: string | string[]) {
    this.query = this.query.select(columns);
    return this;
  }

  where(column: string, operator: string, value: any) {
    this.query = this.query.where(column, operator, value);
    return this;
  }

  whereIn(column: string, values: any[]) {
    this.query = this.query.whereIn(column, values);
    return this;
  }

  whereLike(column: string, value: string) {
    this.query = this.query.where(column, "like", `%${value}%`);
    return this;
  }

  orderBy(column: string, direction: "asc" | "desc" = "asc") {
    this.query = this.query.orderBy(column, direction);
    return this;
  }

  limit(limit: number) {
    this.query = this.query.limit(limit);
    return this;
  }

  offset(offset: number) {
    this.query = this.query.offset(offset);
    return this;
  }

  // Métodos de execução
  async get<T>(): Promise<T[]> {
    return this.query as Promise<T[]>;
  }

  async first<T>(): Promise<T | undefined> {
    this.query = this.query.first();
    return this.query as Promise<T>;
  }

  async insert<T>(data: Partial<T> | Partial<T>[]): Promise<number[]> {
    return this.knex.insert(data).into(this.query.table as unknown as string);
  }

  async update<T>(data: Partial<T>): Promise<number> {
    return this.query.update(data);
  }

  async delete(): Promise<number> {
    return this.query.del();
  }

  // Métodos auxiliares
  raw(sql: string, bindings?: any) {
    return this.knex.raw(sql, bindings);
  }

  getQuery(): string {
    return this.query.toString();
  }

  clone(): QueryBuilder {
    const clonedBuilder = new QueryBuilder(
      this.knex,
      this.query.table as unknown as string
    );
    clonedBuilder.query = this.query.clone();
    return clonedBuilder;
  }
}
