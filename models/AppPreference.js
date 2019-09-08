const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const AppPreference = sequelize.define('apppreference', {
    name: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    }
});

module.exports = AppPreference;