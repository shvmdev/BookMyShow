const express = require("express");
//
const { getMovies } = require("./movies.controller");

const moviesRouter = express.Router();

moviesRouter.get("/", getMovies);

module.exports = moviesRouter;
