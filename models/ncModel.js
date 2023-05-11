const db = require("../db/connection");
const fs = require("fs/promises");

exports.selectTopics = (topic) => {
  let queryString = `SELECT slug, description FROM topics`;
  return db.query(queryString).then((result) => {
    return result.rows;
  });
};
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
