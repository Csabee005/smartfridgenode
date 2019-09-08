const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ContentPreference = sequelize.define('contentpreference', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    operator: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = ContentPreference;