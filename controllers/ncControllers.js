const { selectTopics, selectEndpoints } = require("../models/ncModel.js");

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
  selectEndpoints()
    .then((endpoints) => {
      response.status(200).send({ endpoints: endpoints });
    })
    .catch((error) => {
      next(error);
    });
};
