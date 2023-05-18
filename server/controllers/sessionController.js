const { redirect } = require('react-router-dom');
const Session = require('../models/sessionModel');

const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = (req, res, next) => {
  Session.findOne({ cookieId: req.cookies.ssid }).then((results) => {
    if (results) {
      res.locals.authorized = true;
    } else {
      redirect('/login');
    }
    return next();
  });
};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = (req, res, next) => {
  if (req.cookies.ssid) {
    Session.create({ cookieId: req.cookies.ssid })
      .then(() => {
        return next();
      })
      .catch(() => {
        return next({
          log: 'Error creating session',
          message: { err: 'Problem creating session' },
        });
      });
  }
};

module.exports = sessionController;
