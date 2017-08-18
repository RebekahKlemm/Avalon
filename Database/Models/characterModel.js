var Sequelize = require('sequelize');
var db = require('../_db');

var characterSchema = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    team: {
        type: Sequelize.ENUM,
        values: ['evil', 'good'],
        allowNull: false
    },
    knows: {
        // It is possible to create foreign keys:
        type: Sequelize.ARRAY(Sequelize.TEXT)
    }
};


var characterConfig = {

};



const Character = db.define('character', characterSchema, characterConfig);

module.exports = Character;
