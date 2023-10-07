const faker = require("faker");

const generateRandomMovie = () => {
  const name = faker.lorem.words(3);
  const description = faker.lorem.sentences(2);
  const releaseDate = new Date();
  releaseDate.setHours(0, 1, 0, 0);

  // Generate an endDate that is after the releaseDate
  // const endDate = faker.date.between(releaseDate, faker.date.future(35));
  const endDate = null;

  return {
    name,
    description,
    releaseDate,
    endDate,
  };
};

const generateMovies = (count) => {
  const movies = [];
  for (let i = 0; i < count; i++) {
    movies.push(generateRandomMovie());
  }
  return movies;
};

module.exports = generateMovies;
