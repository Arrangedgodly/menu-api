const mongoose = require('mongoose');
const validator = require('validator');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
})