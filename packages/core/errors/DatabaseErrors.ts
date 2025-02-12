export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class QueryExecutionError extends DatabaseError {
  constructor(operation: string, details: unknown) {
    super(`Failed to execute ${operation}: ${String(details)}`);
    this.name = 'QueryExecutionError';
  }
}

export class EntityNotFoundError extends DatabaseError {
  constructor(entity: string, id: string | number) {
    super(`${entity} with id ${id} not found`);
    this.name = 'EntityNotFoundError';
  }
}
