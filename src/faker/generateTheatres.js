const faker = require("faker");

const generateRandomTheatre = () => {
  const name = faker.company.companyName();
  const description = faker.lorem.sentences(2);

  return {
    name,
    description,
  };
};

const generateRandomTheatreAddress = () => {
  const addressLine1 = faker.address.streetAddress();
  const city = faker.address.city();
  const postalCode = faker.address.zipCode();
  const state = faker.address.state();
  const country = faker.address.country();
  const latitude = faker.address.latitude();
  const longitude = faker.address.longitude();

  return {
    addressLine1,
    city,
    postalCode,
    state,
    country,
    latitude,
    longitude,
  };
};

const generateTheatres = (count) => {
  const theatres = [];
  for (let i = 0; i < count; i++) {
    const theatre = generateRandomTheatre();
    const theatreAddress = generateRandomTheatreAddress();
    theatre.theatreAddress = theatreAddress;
    theatres.push(theatre);
  }
  console.log(theatres);
  return theatres;
};

module.exports = generateTheatres;
