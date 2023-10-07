const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

// ORDER IS IMP! dotenv must come before this
const Movie = require("../models/movies");
const generateMovies = require("../faker/generateMovies");
const { sequelize } = require("../config/mysqldb");

(async () => {
  try {
    // Sync the model with the database
    // await sequelize.sync();

    // Generate 10 random movies in JSON format
    const moviesData = generateMovies(10);

    // Create the movies in the database using Sequelize
    await Promise.all(
      moviesData.map(async (movie) => {
        await Movie.create(movie);
      })
    );

    console.log("Movies created successfully!");
  } catch (error) {
    console.error("Error creating movies:", error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
})();
