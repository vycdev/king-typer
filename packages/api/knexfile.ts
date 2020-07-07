import { Config } from "knex";
import { config } from "dotenv";

config();

export type Configs = Record<string, Config>;

const options = {
    client: process.env.DB_CLIENT,
    connection: process.env.CONNECTION
        ? {
              database: process.env.CONNECTION
          }
        : {
              filename: "db/db.sqlite3"
          },
    migrations: {
        directory: "db/migrations",
        tableName: "migrations"
    },
    debug: process.env.NODE_ENV === "development",
    seeds: {
        directory: "db/seeds"
    },
    useNullAsDefault: process.env.DB_CLIENT === "sqlite3",
    pool: process.env.DB_CLIENT !== "sqlite3" ? { min: 2, max: 10 } : undefined
};

const configs: Configs = {
    development: options,

    test: {
        ...options,
        connection: process.env.TEST_CONNECTION
            ? {
                  database: process.env.TEST_CONNECTION
              }
            : {
                  filename: "db/db.sqlite3"
              }
    },

    production: {
        ...options,
        connection: process.env.DATABASE_URL + "?SSL=no-verify"
    }
};

const { development, test, production } = configs;

export const configuration = { development, test, production };
