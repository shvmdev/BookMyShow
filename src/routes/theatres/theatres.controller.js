const { Op } = require("sequelize");
const Movie = require("../../models/movies");
const Screen = require("../../models/screens");
const ShowTime = require("../../models/showtimes");
const { Theatre, TheatreAddress } = require("../../models/theatres");

const getTheatres = async (req, res) => {
  const { location = "", page = 1, limit = 10 } = req.query;
  const options = {
    include: { model: TheatreAddress, required: true },
    page: page - 1,
    limit: Number(limit),
    attributes: {
      include: ["id", "name", "description"],
    },
  };
  if (location) {
    options.where = {
      "$theatre_address.city$": location, // Using '$' to reference related model column
    };
  }
  try {
    const theatres = await Theatre.findAll(options);
    return res.status(200).json({
      status: "success",
      data: {
        theatres,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getTheatreMovies = async (req, res) => {
  try {
    const { id: theatreId } = req.params;
    const { days = 7 } = req.query;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + parseInt(days));

    const theatre = await Theatre.findByPk(theatreId, {
      include: {
        model: Screen,
        required: true,
        include: {
          model: ShowTime,
          required: true,
          include: {
            model: Movie,
            required: true,
          },
          where: {
            dateTime: {
              [Op.between]: [startDate, endDate],
            },
          },
        },
      },
    });
    if (!theatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    const result = theatre.screens.map((screen) => ({
      screen: screen.name,
      movies: screen.show_times.map((showtime) => ({
        name: showtime.movie.name,
        dateTime: showtime.dateTime,
        bookingsOpen: showtime.bookingsOpen,
      })),
    }));

    res.status(200).json({
      status: "success",
      data: {
        theatreShowTimes: result,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getTheatres,
  getTheatreMovies,
};
