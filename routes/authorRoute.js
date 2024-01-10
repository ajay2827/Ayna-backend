const express = require('express');
const router = express.Router();
const {
  authorLogin,
  getAuthors,
  getAuthor,
  getLoggedInInfo,
} = require('../controllers/authorController');
const authenticationMiddleware = require('../middleware/auth');

// login author route
router.route('/login').post(authorLogin);

// get all authors details
router.route('/').get(getAuthors, authenticationMiddleware);

// get author details
router.route('/:id').get(getAuthor, authenticationMiddleware);

// get Loggedin author details
router.route('/me').get(getLoggedInInfo, authenticationMiddleware);

module.exports = router;
