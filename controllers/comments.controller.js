const { getCommentsByArticleId } = require("../models/comments.model");

exports.getComments = (request, response, next) => {
  const { article_id } = request.params;
  getCommentsByArticleId(article_id)
    .then((comments) => {
      response.status(200).send({ comments: comments });
    })
    .catch((error) => {
      next(error);
    });
};
