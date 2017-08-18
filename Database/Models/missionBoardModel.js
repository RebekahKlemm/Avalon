var Sequelize = require('sequelize');
var db = require('../_db');

var missionBoardSchema = {
    numberOfPlayers: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    missions: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    }
};


var missionBoardConfig = {

};



const MissionBoard = db.define('missionBoard', missionBoardSchema, missionBoardConfig);

module.exports = MissionBoard;
