const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  // connect to database
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
    });

    // alert user connection successful
    console.log('db connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

