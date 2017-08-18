const express = require('express');
const {Character} = require('../Database/Models/index');

// This router is mounted on /api/characters
const router = express.Router();

router.get('/', function (req, res, next){
    Character.findAll()
        .then(function(characters){
            res.send(characters);
        })
        .catch(next);
});

router.get('/:id', function(req, res, next){
    Character.findOne({
        where: {id: req.params.id}
    })
        .then(function(character){
            res.send(character);
        })
        .catch(next);
});

module.exports = router;

