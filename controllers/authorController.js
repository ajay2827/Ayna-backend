const Author = require('../models/Author');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');
const generatetoken = require('../config/generateToken');

// login author
exports.authorLogin = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createCustomError(`Provide necessary credentials`, 400));
  }

  // check user
  const author = await Author.findOne({ email });
  if (!user) {
    return next(createCustomError(`Invalid Email`, 401));
  }

  // compare password
  const matchpassword = await bcrypt.compare(password, author.password);
  if (!matchpassword) {
    return next(createCustomError(`Invalid Password`, 401));
  }

  const token = generatetoken(author._id);
  res.status(200).json({ user, token });
});
