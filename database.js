require('dotenv').config();
const mySql = require('mysql2/promise');

const access = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
};

const pool = mySql.createPool(access);

module.exports = { pool };
