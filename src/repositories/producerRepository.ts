import { Knex } from "knex";
import {
    MOVIES_PRODUCERS_TABLE,
    MOVIES_TABLE,
    PRODUCERS_TABLE
} from "../config/constants";
import ProducerWinner from "../models/producerWinnerModel";

class ProducerRepository {
    private db: Knex;

    constructor(db: Knex) {
        this.db = db;
    }

    async getAllWithWins(): Promise<ProducerWinner[]> {
        return await this.db
            .with(
                "winners",
                this.db(MOVIES_PRODUCERS_TABLE)
                    .select(
                        `${MOVIES_PRODUCERS_TABLE}.producer_id`,
                        `${MOVIES_TABLE}.id as movie_id`
                    )
                    .join(
                        MOVIES_TABLE,
                        `${MOVIES_PRODUCERS_TABLE}.movie_id`,
                        "=",
                        `${MOVIES_TABLE}.id`
                    )
                    .where(`${MOVIES_TABLE}.winner`, 1)
            )
            .from(PRODUCERS_TABLE)
            .select(
                `${PRODUCERS_TABLE}.id as producer_id`,
                `${PRODUCERS_TABLE}.name`,
                `winners.movie_id`,
                `${MOVIES_TABLE}.title`,
                `${MOVIES_TABLE}.year`
            )
            .join(
                "winners",
                "winners.producer_id",
                "=",
                `${PRODUCERS_TABLE}.id`
            )
            .join(MOVIES_TABLE, `winners.movie_id`, "=", `${MOVIES_TABLE}.id`)
            .orderBy(`${PRODUCERS_TABLE}.id`);
    }
}

export default ProducerRepository;
