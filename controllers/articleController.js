const { articleById, createArticles } = require("../models/article.model");

const http = require("http");

exports.getArticleById = (request, response, next) => {
  const { articleId } = request.params;
  articleById(articleId)
    .then((article) => {
      response.status(200).send({ article: article });
    })
    .catch((error) => {
      next(error);
    });
};
exports.getArticles = (request, response, next) => {
  createArticles()
    .then((articles) => {
      response.status(200).send({ articles: articles });
    })
    .catch((error) => {
      next(error);
    });
};
