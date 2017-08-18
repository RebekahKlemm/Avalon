const express = require('express');

// This router is mounted on /api
const router = express.Router();
const characters = require('./characters');
const missionBoards = require('./missionBoards');
const missions = require('./missions');

router.use('/characters', characters);
router.use('/missionBoards', missionBoards);
router.use('/missions', missions);

module.exports = router;
