const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  suit: {
    type: String,
    enum: ['Hearts', 'Diamonds', 'Clubs', 'Spades'],
    required: true
  },
  rank: {
    type: String,
    enum: ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'],
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create a compound index for suit and rank uniqueness
cardSchema.index({ suit: 1, rank: 1 }, { unique: true });

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
