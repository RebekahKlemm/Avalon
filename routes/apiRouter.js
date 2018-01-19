const express = require('express');

// This router is mounted on /api
const router = express.Router();
const characters = require('./characters');
const missionBoards = require('./missionBoards');
const missions = require('./missions');
const players = require('./players');

router.use('/characters', characters);
router.use('/missionBoards', missionBoards);
router.use('/missions', missions);
router.use('/players', players);

module.exports = router;
