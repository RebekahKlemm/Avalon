const express = require('express');
const {MissionBoard, Mission} = require('../Database/Models/index');

// This router is mounted on /api/missionBoards
const router = express.Router();

router.get('/', function (req, res, next){
    Mission.findAll()
        .then(function(missions){
            res.send(missions);
        })
        .catch(next);
});

router.get('/:id', function(req, res, next){
    Mission.findOne({
        where: {id: req.params.id}
    })
        .then(function(mission){
            res.send(mission);
        })
        .catch(next);
});

// get the mission by the number of people and the mission number (ex: 3 people on their first mission would be /3/1)
router.get('/:numOfPeople/:missionNumber', function(req, res, next){
    MissionBoard.findOne({
        where: {numberOfPlayers: req.params.numOfPeople}
    })
        .then(function(missionBoard){
            return Mission.findOne({
                where: {id: missionBoard.missions[req.params.missionNumber-1]}
            })
        })
        .then(function(mission){
            res.send(mission);
        })
        .catch(next);
});

module.exports = router;

