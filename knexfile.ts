import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "sqlite3",
        useNullAsDefault: true,
        connection: {
            filename: ":memory:"
        },
        migrations: {
            directory: "./src/db/migrations"
        },
        seeds: {
            directory: "./src/db/seeds"
        }
    }
};

export default config;
