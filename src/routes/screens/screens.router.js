const express = require("express");
//
const { getScreens } = require("./screens.controller");

const screensRouter = express.Router();

screensRouter.get("/", getScreens);

module.exports = screensRouter;
