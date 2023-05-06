const mongoose = require('mongoose');
const validator = require('validator');

const pricingSchema = new mongoose.Schema({
  bud: {
    type: [Number],
    required: false
  },
  prerolls: {
    type: [Number],
    required: false
  },
  shake: {
    type: [Number],
    required: false
  }
})

module.exports = mongoose.model('Pricing', pricingSchema);