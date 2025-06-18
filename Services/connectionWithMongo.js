// Services/connectionWithMongo.js
import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://lingar:12345678@localhost:27017/IzarJudaicaProMax?authSource=admin';

// Track connection state to prevent multiple connections
let isConnected = false;

/**
 * Connect to MongoDB using Mongoose
 */
export const connectToMongo = async () => {
  // If already connected, skip
  if (isConnected) return;

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,     // Use new URL string parser
      useUnifiedTopology: true, // Use new server discovery engine
    });

    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error; // Let the calling function handle the error
  }
};
