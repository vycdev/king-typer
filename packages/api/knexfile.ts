import { Config } from "knex"
import Knex from "knex"

const options = {
    client: "pg",
    connection: process.env.DATABASE_URL + "?ssl=true",
    migrations: {
        directory: "db",
        tableName: "migrations"
    },
    debug: false,
    useNullAsDefault: true
}

const configs: Record<string, Config> = {
    development: {
        ...options,
        connection: {
            database: "postgres",
            user: "postgres",
            password: "password"
        }
    },

    production: {
        ...options
    }
}

export const { development, production } = configs
const knex = Knex(production)
export default knex
