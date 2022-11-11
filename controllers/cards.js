import { constants } from 'http2';
import { Card } from '../models/card.js';

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send({ message: `На сервере произошла ошибка. ${err.message}` });
  }
};

export const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res
        .status(constants.HTTP_STATUS_BAD_REQUEST)
        .send({ message: `Некорректные данные для карточки. ${err.message}` });
    } else {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: `На сервере произошла ошибка. ${err.message}` });
    }
  }
};

export const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if (!card) {
      res
        .status(constants.HTTP_STATUS_NOT_FOUND)
        .send({ message: 'Карточка не найдена.' });
    } else res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res
        .status(constants.HTTP_STATUS_BAD_REQUEST)
        .send({ message: `Некорректные данные для карточки. ${err.message}` });
    } else {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: `На сервере произошла ошибка. ${err.message}` });
    }
  }
};

export const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      res
        .status(constants.HTTP_STATUS_NOT_FOUND)
        .send({ message: 'Карточка не найдена.' });
    } else res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res
        .status(constants.HTTP_STATUS_BAD_REQUEST)
        .send({ message: `Некорректные данные для карточки. ${err.message}` });
    } else {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: `На сервере произошла ошибка. ${err.message}` });
    }
  }
};

export const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      res
        .status(constants.HTTP_STATUS_NOT_FOUND)
        .send({ message: 'Карточка не найдена.' });
    } else res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res
        .status(constants.HTTP_STATUS_BAD_REQUEST)
        .send({ message: `Некорректные данные для карточки. ${err.message}` });
    } else {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: `На сервере произошла ошибка. ${err.message}` });
    }
  }
};
