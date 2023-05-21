const {
  articleById,
  createArticles,
  updateArticlesVotes,
} = require("../models/article.model");

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
exports.patchArticlesVotes = (request, response, next) => {
  const { article_id } = request.params;
  const { votes_inc_by } = request.body;

  updateArticlesVotes(article_id, votes_inc_by)
    .then((updatedArticle) => {
      response.status(200).send({ article: updatedArticle });
    })
    .catch((err) => {
      next(err);
    });
};
