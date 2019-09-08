const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ProcessLog = sequelize.define('processlog', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    },
    error: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    responseCode: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

module.exports = ProcessLog;