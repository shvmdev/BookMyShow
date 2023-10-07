const { sequelize } = require("../config/mysqldb");
const DataTypes = require("sequelize");

const ShowTime = sequelize.define("show_time", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  // date: {
  //   type: DataTypes.DATEONLY,
  //   allowNull: false,
  // },
  // time: {
  //   type: DataTypes.TIME,
  //   allowNull: false,
  // },
  dateTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  bookingsOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = ShowTime;
