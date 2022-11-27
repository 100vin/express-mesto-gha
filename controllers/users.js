import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { constants } from 'http2';
import { User } from '../models/user.js';

export const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message }); // TODO Заменить обработку ошибок
    });
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .send({ message: 'На сервере произошла ошибка.' });
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
        .send({ message: 'Некорректные данные для пользователя.' });
    } else {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка.' });
    }
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const document = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    const user = document.toObject();
    delete user.password;
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res
        .status(constants.HTTP_STATUS_BAD_REQUEST)
        .send({ message: 'Некорректные данные для пользователя.' });
    } else {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка.' });
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
        .send({ message: 'Некорректные данные для пользователя.' });
    } else {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка.' });
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
        .send({ message: 'Некорректные данные для пользователя.' });
    } else {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка.' });
    }
  }
};
