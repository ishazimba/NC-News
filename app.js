const express = require("express");
const app = express();

const { getTopics } = require("./controllers/topicController");
const { getEndpoints } = require("./controllers/endpoint.controller");
const {
  getArticleById,
  getArticles,
} = require("./controllers/articleController");
const {
  getComments,
  postCommentById,
} = require("./controllers/comments.controller");

app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);
app.get("/api/articles", getArticles);
app.get("/api/articles/:articleId", getArticleById);
app.get("/api/articles/:article_id/comments", getComments);
app.post("/api/articles/:article_id/comments", postCommentById);

app.use((err, request, response, next) => {
  if (err.code == "22P02") {
    response.status(400).send({ message: "BAD REQUEST! INVALID ID" });
  }
  response.status(err.status).send({ message: err.message });
});

module.exports = app;
