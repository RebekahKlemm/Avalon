const express = require('express');

// This router is mounted on /api
const router = express.Router();
const characters = require('./characters');
const missionBoards = require('./missionBoards');
const missions = require('./missions');
const players = require('./players');
const games = require('./games');

router.use('/characters', characters);
router.use('/missionBoards', missionBoards);
router.use('/missions', missions);
router.use('/players', players);
router.use('/games', games);

module.exports = router;
