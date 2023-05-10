const { selectTopics } = require("../models/topics.model.js");

exports.getTopics = (request, response, next) => {
  selectTopics()
    .then((topics) => {
      response.status(200).send({ topics: topics });
    })
    .catch((error) => {
      next(error);
    });
};
