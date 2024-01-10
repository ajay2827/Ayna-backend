const Book = require('../models/Book');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

// get all books details
exports.getBooks = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sortBy = req.query.sortBy || 'likes';
  const sortOptions = {};
  sortOptions[sortBy] = sortBy === 'likes' ? -1 : 1;
  const books = await Book.find()
    .sort(sortOptions)
    .limit(limit)
    .skip((page - 1) * limit)
    .populate('author', 'name email');
  res.status(200).json(books);
});

// like a book
exports.likeBook = asyncWrapper(async (req, res, next) => {
  const bookId = req.params.id;
  const book = await Book.findById(bookId);
  if (!book) {
    return next(createCustomError(`Book not found`, 404));
  }
  book.likes += 1;
  await book.save();
  res
    .status(200)
    .json({ message: 'Book liked successfully', updatedLikes: book.likes });
});

// unlike a book
exports.unlikeBook = asyncWrapper(async (req, res, next) => {
  const bookId = req.params.id;
  const book = await Book.findById(bookId);
  if (!book) {
    return next(createCustomError(`Book not found`, 404));
  }
  if (book.likes > 0) {
    book.likes -= 1;
    await book.save();
  }
  res
    .status(200)
    .json({ message: 'Book unliked successfully', updatedLikes: book.likes });
});
