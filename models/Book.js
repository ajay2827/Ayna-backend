const moongoose = require('mongoose');

const bookSchema = new moongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    author: {
      type: moongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = moongoose.model('Book', bookSchema);
