const fs = require("fs");
const { selectTopics } = require("../models/ncModel.js");

exports.getTopics = (request, response, next) => {
  selectTopics()
    .then((topics) => {
      response.status(200).send({ topics: topics });
    })
    .catch((error) => {
      next(error);
    });
};

exports.fetchEndpoints = (request, response, next) => {
  return fs.readFile("endpoints.json", "utf-8", (error, data) => {
    if (error) {
      console.log(error);
      return response.status(500).json({ error: "SERVER ERROR" });
    }
    const endpoints = JSON.parse(data).endpoints;
    response.json(endpoints);
  });
};
