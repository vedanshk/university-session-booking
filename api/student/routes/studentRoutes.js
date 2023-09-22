const express = require('express');
const router = express.Router();
const StudentController = require('../controller/StudentController');
const authenticationMiddleware = require('../../../middleware/authentication');

// Student login
router.post('/login', StudentController.login);


module.exports = router;
