import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// import { constants } from 'http2';
import { router as userRouter } from './routes/users.js';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.set('runValidators', true);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
