const { sequelize } = require("../config/mysqldb");
const DataTypes = require("sequelize");
const ShowTime = require("./showtimes");

const Movie = sequelize.define("movie", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

Movie.hasMany(ShowTime);
ShowTime.belongsTo(Movie);

module.exports = Movie;
