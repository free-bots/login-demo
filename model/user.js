const sequelize = require("./database/db");
const { Sequelize, Model, DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    // attributes
    ProviderID: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Name: {
      type: Sequelize.STRING
    }
  },
  {
    // options
  }
);

module.exports = User;
