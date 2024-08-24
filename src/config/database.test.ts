import db, { migrateDB } from "./database";

afterAll(async () => {
    await db.destroy();
});

describe("Database Creation Check", () => {
    it("should create database instance in memory", async () => {
        await migrateDB();
    });
    it("should populate database", async () => {
        expect(await db("movies").count()).toEqual([{ "count(*)": 206 }]);
    });
});
