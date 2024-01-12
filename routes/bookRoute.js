const express = require('express');
const router = express.Router();
const {
  getBooks,
  likeBook,
  unlikeBook,
} = require('../controllers/bookController');
const authenticationMiddleware = require('../middleware/auth');

// get book
router.route('/').get(authenticationMiddleware, getBooks);

// like a book
router.route('/like/:id').put(authenticationMiddleware, likeBook);

// unlike a book
router.route('/unlike/:id').put(authenticationMiddleware, unlikeBook);

module.exports = router;
