const db = require('./_db');

const {Character, Mission, MissionBoard, Game, Player} = require('./Models/index');

function newCreateSeeds() {
    const game = {
        roomId: 12345
    };

    const player1 = {
        name: null
    };

    const player2 = {
        name: null
    };

    const character1 = {
        name: "Merlin",
        team: "good",
        knows: ['Loyal Servant of Arthur', 'Minion of Mordred']
    };

    const character2 = {
        name: "Assassin",
        team: "evil",
        knows: ['Minion of Mordred']
    };

    const mission1 = {
        memberCount: 1,
        failsToFail: 1
    };

    const mission2 = {
        memberCount: 2,
        failsToFail: 1
    };

    const mission3 = {
        memberCount: 3,
        failsToFail: 1
    };

    const mb1 = {
        numberOfPlayers: 5
    };

    return Promise.all([
        Game.create(game),
        Character.create(character1),
        Character.create(character2),
        Player.create(player1),
        Player.create(player2),
        Mission.create(mission1),
        Mission.create(mission2),
        Mission.create(mission3),
        MissionBoard.create(mb1)
    ]);
}

module.exports = newCreateSeeds;
