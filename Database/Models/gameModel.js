var Sequelize = require('sequelize');
var db = require('../_db');

var gameSchema = {
    roomKey: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
};

var gameConfig = {

};

const Game = db.define('game', gameSchema, gameConfig);

module.exports = Game;
