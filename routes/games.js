const express = require('express');
const {Game, Player} = require('../Database/Models/index');

// This router is mounted on /api/games
const router = express.Router();

router.get('/', function (req, res, next){
    Game.findAll()
        .then(function(games){
            res.send(games);
        })
        .catch(next);
});

router.get('/:id', function(req, res, next){
    Game.findOne({
        where: {id: req.params.id}
    })
        .then(function(game){
            res.send(game);
        })
        .catch(next);
});

router.get('/:id/players', function(req, res, next){
  console.log('in the route, id', req.params.id);
  Game.findOne({
    where: {id: req.params.id}
  })
    .then(function(game){
      return Player.findAll({
        where: {gameId: game.id}
      });
    })
    .then(function(players) {
      res.send(players);
    })
    .catch(next);
});

module.exports = router;

