const mongoose = require('mongoose');
const seedData = require('../config/dataSeeder');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    seedData();
    console.log(`Connected to Database`);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDB;
