const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const FridgeItem = sequelize.define('fridgeitem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = FridgeItem;