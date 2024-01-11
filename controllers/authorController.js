const Author = require('../models/Author');
const Book = require('../models/Book');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');
const generatetoken = require('../config/generateToken');
const bcrypt = require('bcrypt');

// login author
exports.authorLogin = asyncWrapper(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(createCustomError(`Provide necessary credentials`, 400));
  }

  // check user
  const author = await Author.findOne({ email });
  if (!author) {
    return next(createCustomError(`Invalid Email`, 401));
  }

  const token = generatetoken(author._id);
  res.status(200).json({ author, token });
});

// get authors
exports.getAuthors = asyncWrapper(async (req, res, next) => {
  const authorsWithBookCount = await Author.aggregate([
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: 'author',
        as: 'books',
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        phone_no: 1,
        booksCount: { $size: '$books' },
      },
    },
  ]);
  res.status(200).json({ authorsWithBookCount });
});

// get authors by id
exports.getAuthor = asyncWrapper(async (req, res, next) => {
  const authorId = req.params.id;
  const author = await Author.findById(authorId);
  if (!author) {
    return next(createCustomError(`Author not found`, 404));
  }
  const books = await Book.find({ author: authorId });
  res.status(200).json({
    author: {
      _id: author._id,
      name: author.name,
      email: author.email,
      phone_no: author.phone_no,
    },
    books,
  });
});

// get logged-in user info
exports.getLoggedInInfo = asyncWrapper(async (req, res, next) => {
  if (!req.user) {
    return next(createCustomError(`Not authorized to access this route`, 401));
  }
  console.log(req.user);
  const authorId = req.user.id;
  console.log(authorId);
  const author = await Author.findById(authorId);
  if (!author) {
    return next(createCustomError(`Author not found`, 404));
  }
  const books = await Book.find({ author: authorId });
  res.status(200).json({
    author: {
      _id: author.id,
      name: author.name,
      email: author.email,
      phone_no: author.phone_no,
    },
    books,
  });
});
