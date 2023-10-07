const { sequelize } = require("../config/mysqldb");
const DataTypes = require("sequelize");
const Screen = require("./screens");

const Theatre = sequelize.define("theatre", {
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

const TheatreAddress = sequelize.define("theatre_address", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  addressLine1: {
    type: DataTypes.STRING,
  },
  addressLine2: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postalCode: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING(100),
    defaultValue: "India",
  },
  latitude: {
    type: DataTypes.DOUBLE,
  },
  longitude: {
    type: DataTypes.DOUBLE,
  },
});

Theatre.hasOne(TheatreAddress);
TheatreAddress.belongsTo(Theatre);

Theatre.hasMany(Screen);
Screen.belongsTo(Theatre);

module.exports = { Theatre, TheatreAddress };
