const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dish_name: String,
  servings: Number,
  calories: Number,
  protein: Number,
  fat: Number,
  carbs: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Meal', mealSchema);
