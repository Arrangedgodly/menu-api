const mongoose = require('mongoose');
const validator = require('validator');

const menuSchema = new mongoose.Schema({
  strains: {
    type: mongoose.Schema.ObjectId,
    ref: 'Strain',
    required: true
  },
  availability: {
    
  }
})

module.exports = mongoose.model('Menu', menuSchema);