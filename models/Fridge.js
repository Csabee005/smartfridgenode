const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Fridge = sequelize.define('fridge', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Fridge;