const db = require("../db/connection");

exports.selectTopics = (topic) => {
  console.log("in model");
  let queryString = `SELECT slug, description FROM topics`;
  return db.query(queryString).then((result) => {
    return result.rows;
  });
};
