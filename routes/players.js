const express = require('express');
const {Player} = require('../Database/Models/index');

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

module.exports = router;

