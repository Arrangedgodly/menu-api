const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long.'],
    maxlength: [20, 'Username must be less than 20 characters long.'],
    validate: {
      validator: function (v) {
        return validator.isAlphanumeric(v);
      }
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    validate: {
      validator: function (v) {
        return validator.isAlphanumeric(v);
      }
    },
    select: false
  },
});

userSchema.statics.findUserByCredentials = function (username, password) {
  return this.findOne({ username })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Error('Incorrect username or password.');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Error('Incorrect username or password.');
          }
          return user;
        });
    });
}

module.exports = mongoose.model('user', userSchema);
