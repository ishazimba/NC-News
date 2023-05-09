const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");
const db = require("../db/connection.js");
beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("Get api topics", () => {
  test("GET - status: 200 -should respond with an array of topics object", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const { topics } = response.body;
        expect(response.status).toBe(200);
        expect(Array.isArray(topics)).toBe(true);
        expect(topics[0]).toHaveProperty("slug");
        expect(topics[1]).toHaveProperty("description");
      });
  });
});
