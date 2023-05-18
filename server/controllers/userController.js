const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const userController = {};

userController.createUser = async (req, res, next) => {
  console.log('In createUser');
  const { username, password } = req.body;
  console.log('username ', username);
  console.log('password ', password);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashed pw: ', hashedPassword);
    const createdUser = await User.create({
      username,
      password: hashedPassword,
    });
    console.log('did it create?', createdUser);
    res.locals.createdUser = createdUser;
    return next();
  } catch (err) {
    return next({
      log: 'Error creating new user -- username and/or password not provided',
      status: 400,
      message: { err: 'Username or password invalid.' },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  console.log('Entered verifyUser');
  const { username, password } = req.body;

  try {
    const foundUserInfo = await User.findOne({ username });
    console.log(foundUserInfo);
    if (!foundUserInfo)
      return next({
        log: 'Error logging in -- username and/or password not provided',
        status: 400,
        message: { err: 'Username or password invalid.' },
      });

    const correctPW = await bcrypt.compare(password, foundUserInfo.password);
    if (!correctPW)
      return next({
        log: 'Error logging in -- username and/or password not provided',
        status: 400,
        message: { err: 'Username or password invalid.' },
      });
    res.locals.verified = foundUserInfo.id;
    return next();
  } catch {
    return next({
      log: 'Error logging in -- username and/or password not provided',
      status: 400,
      message: { err: 'Username or password invalid.' },
    });
  }
};

module.exports = userController;
