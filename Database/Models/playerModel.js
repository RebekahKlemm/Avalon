var Sequelize = require('sequelize');
var db = require('../_db');

var playerSchema = {
    character: {
        type: Sequelize.STRING,
        allowNull: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    }
};

var playerConfig = {

};

const Player = db.define('player', playerSchema, playerConfig);

module.exports = Player;

