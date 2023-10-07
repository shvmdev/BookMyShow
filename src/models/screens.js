const { sequelize } = require("../config/mysqldb");
const DataTypes = require("sequelize");
const ShowTime = require("./showtimes");

const Screen = sequelize.define("screen", {
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
});

Screen.hasMany(ShowTime);
ShowTime.belongsTo(Screen);

module.exports = Screen;
