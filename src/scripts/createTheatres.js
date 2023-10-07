const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

// ORDER IS IMP! dotenv must come before this
const { sequelize } = require("../config/mysqldb");
const { Theatre, TheatreAddress } = require("../models/theatres");
const generateTheatres = require("../faker/generateTheatres");

(async () => {
  try {
    // Sync the models with the database
    // await sequelize.sync();

    // Generate 10 random theatres with addresses in JSON format
    const theatresData = generateTheatres(10);

    // Create the theatres and their addresses in the database using Sequelize
    await Promise.all(
      theatresData.map(async (theatreData) => {
        const theatre = await Theatre.create(theatreData);
        const theatreAddress = await TheatreAddress.create({
          theatreId: theatre.id,
          ...theatreData.theatreAddress,
        });
        console.log(`Theatre "${theatre.name}" created successfully!`);
      })
    );
  } catch (error) {
    console.error("Error creating theatres:", error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
})();
