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
  test("GET - status: 200 -should respond with an array of topics object, should have property slug and description", () => {
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
describe("GET article by its id", () => {
  test("GET -status 200 - should respond with the article of the given article id", () => {
    return request(app)
      .get("/api/article/1")
      .expect(200)
      .then((response) => {
        const { article } = response.body;
        expect(article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("GET status: 404 - Responds with error if article id does not exist", () => {
    return request(app)
      .get("/api/article/5000")
      .expect(404)
      .then((response) => {
        const { message } = response.body;
        expect(message).toBe("ERROR: Article id does not exits");
      });
  });
  test("GET status: 400 - Responds with error if invalid article id is provided", () => {
    return request(app)
      .get("/api/article/articleOne")
      .expect(400)
      .then((response) => {
        const { message } = response.body;
        expect(message).toBe("BAD REQUEST! INVALID ID");
      });
  });
});
