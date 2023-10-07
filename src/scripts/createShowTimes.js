const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

// ORDER IS IMP! dotenv must come before this
const { sequelize } = require("../config/mysqldb");
const Movies = require("../models/movies");
const Screen = require("../models/screens");
const ShowTime = require("../models/showtimes");

const getRandom = (arr) => {
  const n = arr.length;
  const selectedIndices = new Set();

  // Generate a random number between 1 and n (both inclusive)
  const randomCount = Math.floor(Math.random() * n) + 1;

  // Generate random unique indices for the selected elements
  while (selectedIndices.size < randomCount) {
    const randomIndex = Math.floor(Math.random() * n);
    selectedIndices.add(randomIndex);
  }

  // Create a new array with the selected elements
  const selectedElements = Array.from(selectedIndices).map(
    (index) => arr[index]
  );
  return selectedElements;
};

const getNextNDays = (N) => {
  const nextNDays = [];
  const today = new Date();

  for (let i = 0; i < N; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    nextNDays.push(nextDay.toDateString());
  }

  return nextNDays;
};

// Helper function to get random number of showtimes (2 to 5) for a day
const getRandomShowtimesPerDay = () => {
  return Math.floor(Math.random() * 4) + 2; // Random number between 2 and 5
};

const createShowTime = async (movieId, screenId, dateTime) => {
  try {
    const showTime = await ShowTime.create({
      dateTime: dateTime,
      bookingsOpen: true, // You can set this as needed.
      movieId: movieId,
      screenId: screenId,
    });

    console.log("ShowTime created:", showTime.toJSON());
  } catch (error) {
    console.error("Error creating ShowTime:", error.message);
  }
};

(async () => {
  try {
    // Sync the model with the database
    // await sequelize.sync();

    // Get movies from the database
    const movies = await Movies.findAll({
      where: {
        endDate: null,
      },
    });
    // Get Screens from the database
    const screens = await Screen.findAll({});
    // Create next N Days where N = 7
    const next7Days = getNextNDays(7);

    // For each movie, pick a few screens, then create atleast 2 show times a day to 5, for next 7 days
    for (let index = 0; index < movies.length; index++) {
      const movie = movies[index];
      // 1. pick screens randomly
      const randomScreens = getRandom(screens);

      // 2. Create showtimes for each screen for the next 7 days
      for (const screen of randomScreens) {
        const showtimesPerDay = getRandomShowtimesPerDay();

        for (const day of next7Days) {
          const showtimes = [];

          for (let i = 0; i < showtimesPerDay; i++) {
            // Create the showtime (you can implement your own logic here)
            // For simplicity, let's just generate random showtime strings
            const showtime = `${
              Math.floor(Math.random() * 12) + 1
            }:${Math.floor(Math.random() * 60)
              .toString()
              .padStart(2, "0")} ${Math.random() < 0.5 ? "AM" : "PM"}`;
            showtimes.push(showtime);
            const dateTime = new Date(`${day} ${showtime}`);
            await createShowTime(movie.id, screen.id, dateTime);
          }

          // Now you can use the showtimes array for further processing
          console.log(
            `${movie} on ${screen} on ${day}: ${showtimes.join(", ")}`
          );
        }
      }
    }

    console.log("Movies created successfully!");
  } catch (error) {
    console.error("Error creating movies:", error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
})();
