var Sequelize = require('sequelize');
var db = require('../_db');

var missionSchema = {
    memberCount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    failsToFail: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
};


var missionConfig = {

};

const Mission = db.define('mission', missionSchema, missionConfig);

module.exports = Mission;
