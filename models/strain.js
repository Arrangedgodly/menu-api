const mongoose = require('mongoose');
const validator = require('validator');

const strainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tier: {
    type: String,
    required: true,
    enum: ['fine', 'finest']
  },
  type: {
    type: String,
    required: true,
    enum: ['sativa', 'indica', 'hybrid']
  },
})

module.exports = mongoose.model('Strain', strainSchema);