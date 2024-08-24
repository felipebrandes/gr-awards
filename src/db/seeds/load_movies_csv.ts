import {
    CSV_FILENAME,
    MOVIES_PRODUCERS_TABLE,
    MOVIES_STUDIOS_TABLE,
    MOVIES_TABLE,
    PRODUCERS_TABLE,
    STUDIOS_TABLE
} from "../../config/constants";
import csv from "csv-parser";
import { once } from "events";
import * as fs from "fs";
import { Knex } from "knex";
import path from "path";

interface CSVRow {
    year: string;
    title: string;
    studios: string | string[];
    producers: string | string[];
    winner: string;
}

interface MovieRecord {
    id: number;
    year: number;
    title: string;
    winner: boolean;
}

interface NameRecord {
    id: number;
    name: string;
}

export async function seed(knex: Knex): Promise<void> {
    const filePath = path.join(__dirname, CSV_FILENAME);
    const fileStream = fs.createReadStream(filePath);
    const rows: CSVRow[] = [];
    fileStream
        .pipe(csv({ separator: ";" }))
        .on("data", (data: any) => rows.push(data));
    await once(fileStream, "end");

    await populateDb(knex, rows);
}

async function populateDb(knex: Knex, rows: CSVRow[]) {
    await knex(MOVIES_TABLE).del();

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        row.producers = parseNames(row.producers as string);
        row.studios = parseNames(row.studios as string);

        const { id: movieId } = await insertMovie(
            knex,
            Number(row.year),
            row.title,
            row.winner === "yes"
        );

        for (const producer of row.producers) {
            const { id: producerId } = await insertProducer(knex, producer);
            await insertMovieProducer(knex, movieId, producerId);
        }

        for (const studio of row.studios) {
            const { id: studioId } = await insertStudio(knex, studio);
            await insertMovieStudio(knex, movieId, studioId);
        }
    }
}

async function insertMovie(
    knex: Knex,
    year: number,
    title: string,
    winner: boolean
) {
    const [movie] = await knex<MovieRecord>(MOVIES_TABLE).insert(
        {
            year,
            title,
            winner
        },
        "id"
    );
    return movie;
}

async function insertProducer(
    knex: Knex,
    producerName: string
): Promise<NameRecord> {
    const producer = await knex<NameRecord>(PRODUCERS_TABLE)
        .where({ name: producerName })
        .first();

    if (producer) {
        return producer;
    }

    const [inserted] = await knex<NameRecord>(PRODUCERS_TABLE).insert(
        [
            {
                name: producerName
            }
        ],
        "*"
    );
    return inserted;
}

async function insertStudio(
    knex: Knex,
    studioName: string
): Promise<NameRecord> {
    const studio = await knex<NameRecord>(STUDIOS_TABLE)
        .where({ name: studioName })
        .first();

    if (studio) {
        return studio;
    }

    const [inserted] = await knex<NameRecord>(STUDIOS_TABLE).insert(
        [
            {
                name: studioName
            }
        ],
        "*"
    );
    return inserted;
}

async function insertMovieProducer(
    knex: Knex,
    movieId: number,
    producerId: number
): Promise<void> {
    await knex(MOVIES_PRODUCERS_TABLE).insert({
        movie_id: movieId,
        producer_id: producerId
    });
}

async function insertMovieStudio(
    knex: Knex,
    movieId: number,
    studioId: number
): Promise<void> {
    await knex(MOVIES_STUDIOS_TABLE).insert({
        movie_id: movieId,
        studio_id: studioId
    });
}

function parseNames(names: string) {
    let namesList = names.replace(" and", ",").split(",");

    namesList = namesList
        .map((name) => name.trim())
        .filter((name) => name !== "");

    return namesList;
}
