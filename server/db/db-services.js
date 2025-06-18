const mongoose = require('mongoose');

const connectDB2 = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/artists-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ DB Connection failed:', err);
    process.exit(1);
  }
};

module.exports = { connectDB2 };