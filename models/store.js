const mongoose = require('mongoose');
const validator = require('validator');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  prices: {
    type: mongoose.Schema.ObjectId,
    ref: 'Pricing',
    required: true
  },
  availabilities: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Availability',
    required: true
  },
})

module.exports = mongoose.model('Store', storeSchema);