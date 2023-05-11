const express = require("express");
const app = express();

const {
  getTopics,
  getEndpoints,
  getArticleById,
} = require("./controllers/ncControllers");

app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);
app.get("/api/article/:articleId", getArticleById);

app.use((err, request, response, next) => {
  if (err.code == "22P02") {
    response.status(400).send({ message: "BAD REQUEST! INVALID ID" });
  }
  response.status(err.status).send({ message: err.message });
});

module.exports = app;
