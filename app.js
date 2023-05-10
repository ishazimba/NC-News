const express = require("express");
const app = express();

const { getTopics, getEndpoints } = require("./controllers/ncControllers");

app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);

app.use((err, request, response, next) => {
  response.status(err.status).send({ message: err.message });
});

module.exports = app;
