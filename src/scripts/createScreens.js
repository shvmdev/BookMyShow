const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

// ORDER IS IMP! dotenv must come before this
const { sequelize } = require("../config/mysqldb");
const { Theatre } = require("../models/theatres");
const generateScreensForTheatre = require("../faker/generateScreens");

(async () => {
  try {
    // Sync the models with the database
    // await sequelize.sync();

    // Fetch all theatres from the database
    const theatres = await Theatre.findAll();

    // Generate and associate screens for each theatre
    await Promise.all(
      theatres.map(async (theatre) => {
        const screens = await generateScreensForTheatre(theatre);
        console.log(
          `Generated ${screens.length} screens for Theatre "${theatre.name}"`
        );
      })
    );
  } catch (error) {
    console.error("Error generating screens:", error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
})();
