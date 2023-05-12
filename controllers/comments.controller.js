const {
  getCommentsByArticleId,
  addCommentById,
} = require("../models/comments.model");

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
exports.postCommentById = (request, response, next) => {
  const { article_id } = request.params;
  const { username, body } = request.body;
  return addCommentById(article_id, username, body)
    .then((comment) => response.status(201).send({ comment }))
    .catch((error) => {
      next(error);
    });
};
