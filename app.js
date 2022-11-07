import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { constants } from 'http2';

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
