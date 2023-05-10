const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");
const db = require("../db/connection.js");
const { endpoints } = require("../endpoints.json");


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
        expect(
          topics.every((topic) => typeof topic === "object" && topic !== null)
        ).toBe(true);
        expect(topics.every((topic) => topic.hasOwnProperty("slug"))).toBe(
          true
        );
        expect(
          topics.every((topic) => topic.hasOwnProperty("description"))
        ).toBe(true);
      });
  });
});
describe("Get API", () => {
  test("GET -status 200 -should respond with JSON Object describing all the available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const { fetchedEndpoints } = response.body;

        expect(fetchedEndpoints).toEqual(endpoints);
      });
  });
});
