const express = require("express");
const app = express();

const { getTopics, getEndpoints } = require("./controllers/ncControllers");

app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);

module.exports = app;
