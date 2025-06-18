const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  location: { type: String }, // מיקום
  lifeApproach: { type: String }, // תיאור של גישת חיים
  likes: { type: String }, // מה הוא אוהב
});

module.exports = { artistSchema };
