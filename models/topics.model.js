const db = require("../db/connection");

exports.selectTopics = (topic) => {
  let queryString = `SELECT slug, description FROM topics`;
  return db.query(queryString).then((result) => {
    return result.rows;
  });
};
