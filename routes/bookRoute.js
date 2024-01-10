const express = require('express');
const router = express.Router();
const {
  getBooks,
  likeBook,
  unlikeBook,
} = require('../controllers/bookController');
const authenticationMiddleware = require('../middleware/auth');

// get book
router.route('/').get(getBooks, authenticationMiddleware);

// like a book
router.route('/like/:id:').put(likeBook, authenticationMiddleware);

// unlike a book
router.route('/unlike/:id:').put(unlikeBook, authenticationMiddleware);

module.exports = router;
