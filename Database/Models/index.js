'use strict';

const Character = require('./characterModel');
const Mission = require('./missionModel');
const MissionBoard = require('./missionBoardModel');
const Game = require('./gameModel');
const Player = require('./playerModel');

// Set up Relationships
Game.hasMany(Player);
Character.hasOne(Player);

module.exports = {
    Character: Character,
    Mission: Mission,
    MissionBoard: MissionBoard,
    Game : Game,
    Player : Player
};
