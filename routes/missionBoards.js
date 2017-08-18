const express = require('express');
const {MissionBoard, Mission} = require('../Database/Models/index');

// This router is mounted on /api/missionBoards
const router = express.Router();

router.get('/', function (req, res, next){
    MissionBoard.findAll()
        .then(function(missionBoards){
            res.send(missionBoards);
        })
        .catch(next);
});

router.get('/:id', function(req, res, next){
    MissionBoard.findOne({
        where: {id: req.params.id}
    })
        .then(function(missionBoard){
            res.send(missionBoard);
        })
        .catch(next);
});

router.get('/:id/:missionNumber', function(req, res, next){
    MissionBoard.findOne({
        where: {id: req.params.id}
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

