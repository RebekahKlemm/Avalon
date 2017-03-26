
const express = require('express');
const db = require('../Database/_db');

// This router is mounted on /api
const router = express.Router();
const users = require('./users');
const alerts = require('./alerts');
const interests = require('./interests');
const addressDetails = require('./addressDetails');



router.use('/users', users);
router.use('/alerts', alerts);
router.use('/interests', interests);
router.use('/addressDetails', addressDetails);


module.exports = router;
