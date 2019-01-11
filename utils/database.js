const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "root", {
  dialect: "mysql",
  host: "localhost",
  timezone: "+02:00"
});

module.exports = sequelize;
