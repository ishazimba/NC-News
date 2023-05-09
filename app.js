const express = require("express");
const app = express();

const { getTopics } = require("./controllers/topics.controller");

app.get("/api/topics", getTopics);

// Error handling middleware
app.use((err, request, response, next) => {
  response.status(err.status).send({ message: err.message });
});

module.exports = app;
