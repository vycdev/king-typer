import { Config } from "knex";
import { config } from "dotenv";

config();

const options = {
    client: process.env.DB_CLIENT,
    connection: process.env.CONNECTION || {
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

const configs: Record<string, Config> = {
    development: options,

    test: {
        ...options,
        connection: process.env.TEST_CONNECTION || {
            filename: "db/testdb.sqlite3"
        }
    },

    production: {
        ...options,
        connection: process.env.DATABASE_URL
    }
};

const { development, test, production } = configs;

export { development, test, production };
