const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const usersRouter = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const strainsRouter = require('./routes/strains');
const errorHandler = require('./handlers/errorHandler');
const { celebrate, Joi, Segments, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/menu_db');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.use(requestLogger);

app.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().min(3).max(20).alphanum().required(),
    password: Joi.string().min(8).alphanum().required(),
  }),
}), createUser);
app.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().min(3).max(20).alphanum().required(),
    password: Joi.string().min(8).alphanum().required(),
  }),
}), login);

app.use('/users', usersRouter);
app.use('/strains', strainsRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);