const mongoose = require('mongoose');

const specialOfferSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  discount: {
    type: String,
    required: true
  },
  validUntil: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SpecialOffer', specialOfferSchema);
