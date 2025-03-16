const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  user1: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  compatibility: {
    type: Number,
    required: true
  },
  compatibilityDetails: {
    values: {
      score: Number,
      details: String
    },
    goals: {
      score: Number,
      details: String
    },
    expectations: {
      score: Number,
      details: String
    }
  },
  status: {
    type: String,
    enum: ['pending', 'connected', 'rejected'],
    default: 'pending'
  },
  initiatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Match', MatchSchema);
