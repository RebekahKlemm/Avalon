'use strict';

const Character = require('./characterModel');
const Mission = require('./missionModel');
const MissionBoard = require('./missionBoardModel');

// Set up Relationships


module.exports = {
    Character: Character,
    Mission: Mission,
    MissionBoard: MissionBoard
};
