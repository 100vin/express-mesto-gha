import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { constants } from 'http2';
import { errors } from 'celebrate';
import { login, createUser } from './controllers/users.js';
import { auth } from './middlewares/auth.js';
import { router as userRouter } from './routes/users.js';
import { router as cardRouter } from './routes/cards.js';
import { celebrateBodyUser, celebrateBodyAuth } from './validators/users.js';
import { NotFoundError } from './errors/index.js';

const { PORT = 3000 } = process.env;
const app = express();

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

mongoose.set('runValidators', true);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());

app.post('/signin', celebrateBodyAuth, login);
app.post('/signup', celebrateBodyUser, createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.all('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const status = err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = err.message || 'Неизвестная ошибка';
  res.status(status).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
