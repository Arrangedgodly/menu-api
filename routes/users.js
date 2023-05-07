const router = require('express').Router();
const {
  getUsers,
  getUser,
  deleteUser,
  updateUser
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { celebrate, Joi, Segments } = require('celebrate');

router.get('/', auth, getUsers);
router.get('/me', auth, getUser);
router.delete('/me', auth, deleteUser);
router.patch('/me', auth, celebrate({
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().min(3).max(20).alphanum(),
    password: Joi.string().min(8).alphanum(),
  }),
}), updateUser);

module.exports = router;