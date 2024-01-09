const moongoose = require('mongoose');

const authorSchema = new moongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_no: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = moongoose.model('Author', authorSchema);
