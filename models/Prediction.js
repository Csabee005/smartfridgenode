const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Prediction = sequelize.define('prediction', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    confidence: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

module.exports = Prediction;