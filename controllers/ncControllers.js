const { selectTopics } = require("../models/ncModel.js");
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
    response.statusCode = 200;
    response.end(JSON.stringify(endpoints));
  } else {
    response.statusCode = 500;

    response.end("SERVER ERROR");
  }
};
