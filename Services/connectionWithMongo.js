// const mongoose = require('mongoose');
import mongoose from "mongoose";

const MONGO_URI = 'mongodb://localhost:27017/IzarJudaicaProMax';

export const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Success MongoDB');
  } catch (error) {
    console.error('Error - MongoDB:', error.message);
  }
};

// module.exports = connectToMongo;