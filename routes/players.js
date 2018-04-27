const express = require('express');
const {Game, Player} = require('../Database/Models/index');

// This router is mounted on /api/players
const router = express.Router();

router.get('/', function (req, res, next){
    Player.findAll()
        .then(function(players){
            res.send(players);
        })
        .catch(next);
});

router.get('/:id', function(req, res, next){
    Player.findOne({
        where: {id: req.params.id}
    })
        .then(function(player){
            res.send(player);
        })
        .catch(next);
});

router.put('/:id', function(req, res, next){
    Player.findById(req.params.id)
        .then((player) => {
            // update the player name
            if(req.body.name) {
                return player.update({
                    name: req.body.name
                })
            } else {
                return player;
            }
        })
        .then((player) => {
            // add player to correct game based on the roomKey
            if (req.body.roomKey) {
               return Game.findOne({where:{roomKey:req.body.roomKey}})
                   .then(function(game){
                       return game.addPlayer(player)
                           .then(function () {
                               return Player.findById(player.id);
                           })
                   })
            } else {
                return player;
            }
        })
        .then((player) => {
            res.send(player);
        })
        .catch(next);
});

module.exports = router;

