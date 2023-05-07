const mongoose = require('mongoose');
const validator = require('validator');

const availabilitySchema = new mongoose.Schema({
  strain: {
    type: mongoose.Schema.ObjectId,
    ref: 'Strain',
    required: true
  },
  fivePack: {
    type: Number,
    required: false,
    default: 0
  },
  prerolls: {
    type: Number,
    required: false,
    default: 0
  },
  gram: {
    type: Number,
    required: false,
    default: 0
  },
  eighth: {
    type: Number,
    required: false,
    default: 0
  },
  quarter: {
    type: Number,
    required: false,
    default: 0
  },
  half: {
    type: Number,
    required: false,
    default: 0
  },
  ounce: {
    type: Number,
    required: false,
    default: 0
  },
})

module.exports = mongoose.model('Availability', availabilitySchema);