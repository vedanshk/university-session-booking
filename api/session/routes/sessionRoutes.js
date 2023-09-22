const express = require('express');
const router = express.Router();
const SessionController = require('../controller/SessionController')
const authenticate = require("../../../middleware/authentication");

// List Free Dean Sessions API
router.get('/free', authenticate, SessionController.listFreeDeanSessions);
router.post('/book' , authenticate , SessionController.bookDeanSession);
router.get('/pending', authenticate, SessionController.listPendingDeanSessions);

module.exports = router;
