import { constants } from 'http2';
import { User } from '../models/user.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send({ message: `На сервере произошла ошибка. ${err.message}` });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res
        .status(constants.HTTP_STATUS_NOT_FOUND)
        .send({ message: 'Пользователь не найден.' });
    } else res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res
        .status(constants.HTTP_STATUS_BAD_REQUEST)
        .send({ message: `Некорректные данные для пользователя. ${err.message}` });
    } else {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: `На сервере произошла ошибка. ${err.message}` });
    }
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res
        .status(constants.HTTP_STATUS_BAD_REQUEST)
        .send({ message: `Некорректные данные для пользователя. ${err.message}` });
    } else {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: `На сервере произошла ошибка. ${err.message}` });
    }
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true },
    );
    if (!user) {
      res
        .status(constants.HTTP_STATUS_NOT_FOUND)
        .send({ message: 'Пользователь не найден.' });
    } else res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res
        .status(constants.HTTP_STATUS_BAD_REQUEST)
        .send({ message: `Некорректные данные для пользователя. ${err.message}` });
    } else {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: `На сервере произошла ошибка. ${err.message}` });
    }
  }
};

export const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true },
    );
    if (!user) {
      res
        .status(constants.HTTP_STATUS_NOT_FOUND)
        .send({ message: 'Пользователь не найден.' });
    } else res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res
        .status(constants.HTTP_STATUS_BAD_REQUEST)
        .send({ message: `Некорректные данные для пользователя. ${err.message}` });
    } else {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: `На сервере произошла ошибка. ${err.message}` });
    }
  }
};
