const express = require("express");
const usersRouter = require("./users/users.router");
const moviesRouter = require("./movies/movies.router");
const screensRouter = require("./screens/screens.router");
const showTimesRouter = require("./showtimes/showtimes.router");
const theatresRouter = require("./theatres/theatres.router");

const api = express.Router();

api.use("/users", usersRouter);
api.use("/movies", moviesRouter);
api.use("/screens", screensRouter);
api.use("/showtimes", showTimesRouter);
api.use("/theatres", theatresRouter);

module.exports = api;
