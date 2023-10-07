const faker = require("faker");

const generateRandomScreen = () => {
  const name = faker.random.word();
  const description = faker.lorem.sentences(2);

  return {
    name,
    description,
  };
};

const generateScreensForTheatre = (theatre) => {
  const screenCount = faker.datatype.number({ min: 1, max: 8 });
  const screens = [];
  for (let i = 0; i < screenCount; i++) {
    screens.push(generateRandomScreen());
  }
  return Promise.all(
    screens.map(async (screenData) => await theatre.createScreen(screenData))
  );
};

module.exports = generateScreensForTheatre;
