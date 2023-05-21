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
exports.addCommentById = (article_id, username, body) => {
  const queryStr = `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`;

  const queryValues = [article_id, username, body];

  return db.query(queryStr, queryValues).then((result) => {
    return result.rows[0];
  });
};
