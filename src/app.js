const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const apiV1 = require("./routes/api.v1");

const app = express();

// Add CORS and security related middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/v1", apiV1);

module.exports = app;
