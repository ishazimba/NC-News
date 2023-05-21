const db = require("../db/connection");
const fs = require("fs/promises");
const { checkArticle } = require("../db/seeds/utils");

exports.articleById = (articleId) => {
  return db
    .query(`SELECT *FROM articles WHERE article_id =$1`, [articleId])
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject({
          status: 404,
          message: "ERROR: Article id does not exits",
        });
      } else {
        return result.rows[0];
      }
    });
};
exports.createArticles = (articles) => {
  return db
    .query(
      `SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes,articles.article_img_url, COUNT(comment_id) AS comment_count FROM articles JOIN comments ON comments.article_id =articles.article_id GROUP BY articles.article_id ORDER BY created_at DESC;`
    )
    .then((result) => {
      return result.rows;
    });
};
exports.updateArticlesVotes = (article_id, votes_inc_by) => {
  return checkArticle(article_id)
    .then(() => {
      return db.query(
        `UPDATE articles 
        SET votes = votes + $1 
        WHERE article_id = $2 
        RETURNING *;`,
        [votes_inc_by, article_id]
      );
    })
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject({ status: 404, message: "Article ID not found" });
      } else {
        return result.rows[0];
        console.log(result.rows[0]);
        return result.rows[0];
      }
    });
};
