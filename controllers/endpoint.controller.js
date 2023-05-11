const endpoints = require("../endpoints.json");

exports.getEndpoints = (request, response, next) => {
  if (request.url === "/api" && request.method === "GET") {
    const endpoint = endpoints;
    response.status(200).send(JSON.stringify(endpoints));
  } else {
    response.status(500).send("500: SERVER ERROR");
  }
};
