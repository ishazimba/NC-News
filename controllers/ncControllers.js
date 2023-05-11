const { selectTopics, articleById } = require("../models/ncModel.js");
const endpoints = require("../endpoints.json");
const http = require("http");

exports.getTopics = (request, response, next) => {
  selectTopics()
    .then((topics) => {
      response.status(200).send({ topics: topics });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getEndpoints = (request, response, next) => {
  if (request.url === "/api" && request.method === "GET") {
    const endpoint = endpoints;
    response.status(200).send(JSON.stringify(endpoints));
  } else {
    response.status(500).send("500: SERVER ERROR");
  }
};
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
