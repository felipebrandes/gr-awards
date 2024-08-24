import app from "./app";
import db, { migrateDB } from "./config/database";
import request from "supertest";

beforeAll(async () => {
    await migrateDB();
});

afterAll(async () => {
    await db.destroy();
});

describe("App Tests", () => {
    it("should return intervals between wins (min and max) of producers", async () => {
        const response = await request(app).get("/winners/min-max-interval");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            min: [
                {
                    producer: "Joel Silver",
                    interval: 1,
                    previousWin: 1990,
                    followingWin: 1991
                }
            ],
            max: [
                {
                    producer: "Matthew Vaughn",
                    interval: 13,
                    previousWin: 2002,
                    followingWin: 2015
                }
            ]
        });
    });
});
