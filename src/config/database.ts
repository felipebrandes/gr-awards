import knex from "knex";
import config from "../../knexfile";

const db = knex(config.development);

export async function migrateDB() {
    console.log("[DATABASE] Starting...");
    await db.migrate.latest();
    await db.seed.run();
    console.log("[DATABASE] Ready!");
}

export default db;
