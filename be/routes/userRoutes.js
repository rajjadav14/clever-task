const express = require('express');
const { login, signup, logOut } = require('../controller/userController');

const router = express.Router();

router.post('/login', login);
router.post('/register', signup);
router.get('/signout', logOut);

module.exports = router;