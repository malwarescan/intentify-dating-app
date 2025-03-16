const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  occupation: {
    type: String
  },
  bio: {
    type: String
  },
  photos: {
    type: [String],
    default: []
  },
  values: {
    type: [String],
    default: []
  },
  relationshipGoals: {
    type: Object,
    default: {
      relationshipType: '',
      timeline: 0,
      familyPlans: '',
      dealBreakers: []
    }
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationMethod: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
