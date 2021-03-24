const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getProfile, createUser, updateProfile, getMe, updateAvatar
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', getProfile);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}),updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri(),
  }),
}),updateAvatar);

module.exports = router;
