const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 

const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');

const port = process.env.PORT || 3000;

const MONGO_URI =
'mongodb+srv://jeff-user:OhcSk2i7cb6bNJU7@cluster0.5z6r4sx.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const snippetsRouter = require('./routes/snippets');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/snippets', snippetsRouter);

app.post('/signup', userController.createUser, (req, res) => {
  if (res.locals.createdUser) {
    return res.status(201).json({ message: 'Success' }); // **TODO**: Where should we redirect user to after successful signup?
  } else {
    return res.status(409).json({ message: 'User already exists!' });
  }
});

// call makeCookie after verify
app.post('/login', userController.verifyUser, cookieController.setCookie, (req, res) => {
  // what should happen here on successful log in?
  if (res.locals.verified) {
    return res.status(201).json({ message: 'Success' }); // **TODO**: Where should we redirect user to after successful login?
  } else {
    return res.status(409).json({ message: 'Username already exists!'});
  }
});



app.use((req, res) => res.status(404).send('Invalid endpoint'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
