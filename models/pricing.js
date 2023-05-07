const mongoose = require('mongoose');
const validator = require('validator');

const pricingSchema = new mongoose.Schema({
  fine: {
    type: [Number],
    required: false,
    validate: {
      validator: function (v) {
        return v.length === 5;
      }
    }
  },
  finest: {
    type: [Number],
    required: false,
    validate: {
      validator: function (v) {
        return v.length === 5;
      }
    }
  },
  special: {
    type: [Number],
    required: false,
    validate: {
      validator: function (v) {
        return v.length === 5;
      }
    }
  },
  prerolls: {
    type: [Number],
    required: false,
    validate: {
      validator: function (v) {
        return v.length === 4;
      }
    }
  },
  specialPrerolls: {
    type: [Number],
    required: false,
    validate: {
      validator: function (v) {
        return v.length === 4;
      }
    }
  },
  fivePack: {
    type: Number,
    required: false
  },
  popcorn: {
    type: [Number],
    required: false,
    validate: {
      validator: function (v) {
        return v.length === 4;
      }
    }
  },
  grinds: {
    type: [Number],
    required: false,
    validate: {
      validator: function (v) {
        return v.length === 3;
      }
    }
  }
})

module.exports = mongoose.model('Pricing', pricingSchema);