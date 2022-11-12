import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { constants } from 'http2';
import { router as userRouter } from './routes/users.js';
import { router as cardRouter } from './routes/cards.js';

const { PORT = 3000 } = process.env;
const app = express();

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

mongoose.set('runValidators', true);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = { _id: '636c0fb299c8eae764e52aeb' };
  // псевдоавторизация
  // if (req.headers.Authorization || req.headers.authorization) {
  //   req.user._id = req.headers.Authorization || req.headers.authorization;
  // }
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.all('/*', (req, res) => {
  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send({ message: 'Страница не найдена.' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
