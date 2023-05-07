const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = process.env;
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const PermissionsError = require('../errors/permissions-err');
const ExistingError = require('../errors/existing-err');
const AuthError = require('../errors/auth-err');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
}

module.exports.getUser = (req, res, next) => {
  User.findById( {_id: req.user._id} )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found.');
      }
      return res.send(user);
    }
    )
    .catch(next);
}

module.exports.createUser = (req, res, next) => {
  const {
    username,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      username,
      password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('There was an error creating the user.');
      }
      if (err.name === 'MongoError') {
        throw new ExistingError('Username already exists.');
      }
    })
    .catch(next);
}

module.exports.login = (req, res, next) => {
  const {
    username,
    password,
  } = req.body;
  return User.findUserByCredentials(username, password)
    .then((user) => {
      if (!user) {
        throw new AuthError('Incorrect username or password.');
      }
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
}

module.exports.deleteUser = (req, res, next) => {
  User.findById( {_id: req.user._id} )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found.');
      }
      return User.deleteOne(user);
    }
    )};

module.exports.updateUser = (req, res, next) => {
  const {
    username,
    password,
  } = req.body;
  User.findById( {_id: req.user._id} )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found.');
      }
      return User.findByIdAndUpdate(
        {_id: req.user._id},
        { username, password },
        { new: true },
      );
    })
    .then((user) => res.send(user))
    .catch(next);
}