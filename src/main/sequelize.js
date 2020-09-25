const { Sequelize } = require('sequelize');

const dialect = process.env.DATABASE_DIALECT;
const endpoint = process.env.DATABASE_ENDPOINT;
const dbname = process.env.DATABASE_NAME;
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;

const sequelize = new Sequelize(
  dbname, username, password, {
  host: endpoint,
  dialect: dialect,
  logging: console.log
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;