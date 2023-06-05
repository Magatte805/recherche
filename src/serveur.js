const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://0.0.0.0:27017/ObardiBase', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

const locationSchema = new mongoose.Schema({
    city: { type: String, required: true },
    department: { type: String, required: true },
    codeINSEE: { type: String, required: true },
  });
  
  const Location = mongoose.model('Location', locationSchema);
  
  module.exports = Location;

module.exports = connectDB;
