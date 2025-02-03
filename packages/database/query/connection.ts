import knexLib, { Knex } from "knex";
import configs from "../knexfile";

const environment = process.env.NODE_ENV || "development";
const config = configs[environment];

export const connection: Knex = knexLib(config);
