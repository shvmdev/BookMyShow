const express = require("express");
//
const { getShowTimes } = require("./showtimes.controller");

const showTimesRouter = express.Router();

showTimesRouter.get("/", getShowTimes);

module.exports = showTimesRouter;
