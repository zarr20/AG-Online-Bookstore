// db.js
const {
    Sequelize
} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost', // Ganti dengan host MySQL Anda
    username: 'root', // Ganti dengan username MySQL Anda
    password: '', // Ganti dengan password MySQL Anda
    database: 'test_astragraphia', // Ganti dengan nama database Anda
});

module.exports = sequelize;