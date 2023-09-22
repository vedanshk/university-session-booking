const express = require('express');
const router = express.Router();
const DeanController = require('../controller/DeanController');


// Dean login route
router.post('/login', DeanController.login);

// Add other dean-related routes here

module.exports = router;
