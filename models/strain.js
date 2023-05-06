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
    enum: ['fine', 'finest', 'special', 'budget', 'popcorn', 'grinds', 'promo']
  },
  type: {
    type: String,
    required: true,
    enum: ['sativa', 'indica', 'hybrid']
  },
  quantity: {
    type: String,
    required: true,
    enum: ['gram', 'eighth', 'quarter', 'half', 'ounce', 'preroll', 'pack']
  },
})

module.exports = mongoose.model('Strain', strainSchema);