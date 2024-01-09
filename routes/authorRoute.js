const express = require('express');
const router = express.Router();
const { authorLogin } = require('../controllers/authorController');

// login author route
router.route('/login').post(authorLogin);

module.exports = router;
