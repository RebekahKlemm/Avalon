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
        .then(function(player){
            return player.update({
                name: req.body.name
            })
        })
        .then(function(player){
            res.send(player);
        })
        .catch(next);
});

// Refactor this to be handled in /:id route above (e.g. if req.body.roomKey, get the Game, etc)
router.put('/:id/game', function(req, res,next){
    let game = Promise.all([
        Game.findOne({where:{roomKey:req.body.roomKey}}),
        Player.findOne({where: {id:req.params.id}}),
    ])
    .then(([_game, player]) => {
        return _game.addPlayer(player);
    })
    .catch(next);

    res.send(game);
});

module.exports = router;

