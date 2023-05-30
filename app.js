const express = require("express");
const app = express();
const cors = require("cors");

const { getTopics } = require("./controllers/topicController");
const { getEndpoints } = require("./controllers/endpoint.controller");
const {
  getArticleById,
  getArticles,
  patchArticlesVotes,
} = require("./controllers/articleController");
const {
  getComments,
  postCommentById,
} = require("./controllers/comments.controller");

app.use(express.json());
app.use(cors());

app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);
app.get("/api/articles", getArticles);
app.get("/api/articles/:articleId", getArticleById);
app.get("/api/articles/:article_id/comments", getComments);
app.post("/api/articles/:article_id/comments", postCommentById);
app.patch("/api/articles/:article_id", patchArticlesVotes);

app.use((err, request, response, next) => {
  if (err.code == "22P02") {
    response.status(400).send({ message: "BAD REQUEST! INVALID ID" });
  }
  response.status(err.status).send({ message: err.message });
});

module.exports = app;
/*  
 app.use((err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ message: "BAD REQUEST! INVALID ID" });
  } else if (err.code === "23502") {
    response.status(400).send({ message: "Invalid post body" });
  } else if (err.code === "23503") {
    if (err.constrainst === "comments_article_id_fkey") {
      response.status(404).send({ message: "Username not found" });
    } else if (err.constrainst === "comments_article_id_fkey") {
      response.status(400).send({ message: "Article id not found" });
    }
  }
});
app.use((err, request, response, next) => {
  if (err.status && err.message) {
    response.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
});
 *******/
