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

// get Loggedin author details
router.route('/me').get(authenticationMiddleware, getLoggedInInfo);

// get all authors details
router.route('/').get(authenticationMiddleware, getAuthors);

// get author details
router.route('/:id').get(authenticationMiddleware, getAuthor);

module.exports = router;
