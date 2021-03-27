const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(8),
    link: Joi.string().uri(),
  }),
}),createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/likes/:cardId', likeCard);
router.delete('/cards/likes/:cardId', dislikeCard);

module.exports = router;
