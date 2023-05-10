const db = require("../db/connection");
const fs = require("fs/promises");

exports.selectTopics = (topic) => {
  let queryString = `SELECT slug, description FROM topics`;
  return db.query(queryString).then((result) => {
    return result.rows;
  });
};
