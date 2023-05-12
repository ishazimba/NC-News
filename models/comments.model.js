const db = require("../db/connection");
const fs = require("fs/promises");
const { checkArticle } = require("../db/seeds/utils");

exports.getCommentsByArticleId = (article_id) => {
  return checkArticle(article_id)
    .then(() => {
      return db.query(
        `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`,
        [article_id]
      );
    })
    .then((results) => {
      return results.rows;
    });
};
