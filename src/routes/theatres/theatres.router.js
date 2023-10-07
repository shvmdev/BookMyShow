const express = require("express");
//
const { getTheatres, getTheatreMovies } = require("./theatres.controller");

const theatresRouter = express.Router();

theatresRouter.get("/", getTheatres);

theatresRouter.get("/:id/movies", getTheatreMovies);

module.exports = theatresRouter;
