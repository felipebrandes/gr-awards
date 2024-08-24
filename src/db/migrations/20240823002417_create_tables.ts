import type { Knex } from "knex";

import {
    MOVIES_PRODUCERS_TABLE,
    MOVIES_STUDIOS_TABLE,
    MOVIES_TABLE,
    PRODUCERS_TABLE,
    STUDIOS_TABLE
} from "../../config/constants";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(MOVIES_TABLE, (table) => {
        table.increments("id").primary();
        table.integer("year").notNullable();
        table.string("title").notNullable();
        table.boolean("winner").notNullable();
    });
    await knex.schema.createTable(PRODUCERS_TABLE, (table) => {
        table.increments("id").primary();
        table.string("name").notNullable().unique();
    });
    await knex.schema.createTable(STUDIOS_TABLE, (table) => {
        table.increments("id").primary();
        table.string("name").notNullable().unique();
    });
    await knex.schema.createTable(MOVIES_PRODUCERS_TABLE, (table) => {
        table
            .integer("movie_id")
            .notNullable()
            .references("id")
            .inTable("movies")
            .onDelete("CASCADE");
        table
            .integer("producer_id")
            .notNullable()
            .references("id")
            .inTable("producers")
            .onDelete("CASCADE");
        table.unique(["movie_id", "producer_id"]);
    });
    await knex.schema.createTable(MOVIES_STUDIOS_TABLE, (table) => {
        table
            .integer("movie_id")
            .notNullable()
            .references("id")
            .inTable("movies")
            .onDelete("CASCADE");
        table
            .integer("studio_id")
            .notNullable()
            .references("id")
            .inTable("studios")
            .onDelete("CASCADE");
        table.unique(["movie_id", "studio_id"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(MOVIES_STUDIOS_TABLE);
    await knex.schema.dropTable(MOVIES_PRODUCERS_TABLE);
    await knex.schema.dropTable(STUDIOS_TABLE);
    await knex.schema.dropTable(PRODUCERS_TABLE);
    await knex.schema.dropTable(MOVIES_TABLE);
}
