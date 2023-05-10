const express = require("express");
const app = express();

const { getTopics, fetchEndpoints } = require("./controllers/ncControllers");

app.get("/api/topics", getTopics);
app.get("/api", fetchEndpoints);

app.use((err, request, response, next) => {
  response.status(err.status).send({ message: err.message });
});

module.exports = app;
