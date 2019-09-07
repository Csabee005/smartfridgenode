const Sequelize = require('sequelize');

const sequelize = new Sequelize('smart_fridge', 'root', 'admin', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;