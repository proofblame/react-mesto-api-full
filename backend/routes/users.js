const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getProfile, createUser, updateProfile, getMe, updateAvatar
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/me', getMe);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24),
  }),
}),getProfile);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}),updateProfile);
router.patch('users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().trim().uri(),
  }),
}), updateAvatar);

module.exports = router;
