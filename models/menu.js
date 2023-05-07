const mongoose = require('mongoose');
const validator = require('validator');

const menuSchema = new mongoose.Schema({
  store: {
    type: mongoose.Schema.ObjectId,
    ref: 'Store',
    required: true
  },
  strains: {
    type: mongoose.Schema.ObjectId,
    ref: 'Strain',
    required: true
  },
})

module.exports = mongoose.model('Menu', menuSchema);