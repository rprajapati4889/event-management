const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: false
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import models
db.Event = require('./event.model')(sequelize);

// No associations needed

module.exports = db;
