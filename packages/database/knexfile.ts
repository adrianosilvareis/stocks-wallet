import { getEnvOrDefault } from "@stocks/core";
import { config } from "dotenv";
import { Knex } from "knex";

config();

const defaultConfig: Knex.Config = {
  client: "pg",
  connection: {
    host: getEnvOrDefault("DB_HOST", "localhost"),
    port: Number(getEnvOrDefault("DB_PORT", "5432")),
    user: getEnvOrDefault("DB_USER", "postgres"),
    password: getEnvOrDefault("DB_PASSWORD", "password"),
    database: getEnvOrDefault("DB_NAME", "stocks")
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations"
  }
};

export const configs: Record<string, Knex.Config> = {
  development: {
    ...defaultConfig,
    debug: true
  },

  test: {
    ...defaultConfig,
    connection: {
      ...(defaultConfig.connection as object),
      database: `${process.env.DB_NAME}_test`
    }
  },

  production: {
    ...defaultConfig,
    pool: {
      min: 2,
      max: 20
    }
  }
};

export default configs;
