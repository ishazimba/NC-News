const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");
const db = require("../db/connection.js");
const { endpoints } = require("../endpoints.json");
require("jest-sorted");

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
      .get("/api/articles/1")
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
      .get("/api/articles/5000")
      .expect(404)
      .then((response) => {
        const { message } = response.body;
        expect(message).toBe("ERROR: Article id does not exits");
      });
  });
  test("GET status: 400 - Responds with error if invalid article id is provided", () => {
    return request(app)
      .get("/api/articles/articleOne")
      .expect(400)
      .then((response) => {
        const { message } = response.body;
        expect(message).toBe("BAD REQUEST! INVALID ID");
      });
  });
});
describe("GET api/articles", () => {
  test("GET status 200- should respond with the an articles array of objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("string");
        });
        expect(articles.length).toBeGreaterThan(0);
      });
  });
  test("the article should be sorted by date in descending order.", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;

        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});
describe("GET api/article/:article_id/comments", () => {
  test("GET status: 200 - should respond with an array of comments for the given article id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        const { comments } = response.body;
        expect(comments).toBeSortedBy("created_at", { descending: true });
        comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            body: expect.any(String),
            article_id: expect.any(Number),
          });
        });
        expect(comments).toBeInstanceOf(Array);
        comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id");
          expect(comment).toHaveProperty("votes");
          expect(comment).toHaveProperty("created_at");
          expect(comment).toHaveProperty("author");
          expect(comment).toHaveProperty("body");
          expect(comment).toHaveProperty("article_id");
        });
        expect(comments.length).toBeGreaterThan(0);
      });
  });
  test("GET status: 400 - Responds with error if invalid article id is provided", () => {
    return request(app)
      .get("/api/articles/Invalidarticle/comments")
      .expect(400)
      .then((response) => {
        const { message } = response.body;
        expect(message).toBe("BAD REQUEST! INVALID ID");
      });
  });
  test("GET status: 404 - Responds with error if article id does not exist", () => {
    return request(app)
      .get("/api/articles/5000/comments")
      .expect(404)
      .then((response) => {
        const { message } = response.body;
        expect(message).toBe("ERROR: Article id does not exits");
      });
  });
  test("GET status: 200 -Responds with an emty array if there is no comments available for the article", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then((response) => {
        const { comments } = response.body;
        expect(comments).toEqual([]);
      });
  });
});
