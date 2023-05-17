const User = require('../models/userModel');
const bcrypt = require('bcrypt'); 

const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ username, hashedPassword });
    } else {
      res.locals.createdUser = false;
    }
    return next();
  } catch (err) {
    return next({
      log: 'Error creating new user -- username and/or password not provided',
      status: 400,
      message: { err: 'Username or password invalid.' }
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const foundUserInfo = await User.findOne({ username });
    console.log(foundUserInfo);
    const correctPW = await bcrypt.compare(password, foundUserInfo.password);
    if (!foundUserInfo || !correctPW) return res.status(401).json({ message: 'Username or password incorrect'});
    res.locals.verified = correctPW;
    return next();
  } catch {
    return next({
      log: 'Error logging in -- username and/or password not provided',
      status: 400,
      message: { err: 'Username or password invalid.' }
    });
  }
};

module.exports = userController;
