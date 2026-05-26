const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  history: {
    type: String,
    required: true
  },
  mission: {
    type: String,
    required: true
  },
  vision: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  stats: {
    type: [{
      label: String,
      value: String
    }],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('About', aboutSchema);
