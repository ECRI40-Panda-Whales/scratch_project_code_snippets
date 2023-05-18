const Session = require('../models/sessionModel');

const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = (req, res, next) => {
  Session.findOne({ cookieId: req.cookies.verified }).then((results) => {
    if (results) {
      res.locals.authorized = true;
    } else {
      res.locals.authorized = false;
    }
    return next();
  });
};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = (req, res, next) => {
  console.log('started the startSession middleware');
  if (res.locals.ssid) {
    Session.create({ cookieId: res.locals.ssid })
      .then(() => {
        console.log('created the session');
        return next();
      })
      .catch(() => {
        return next({
          log: 'Error creating session',
          message: { err: 'Problem creating session' }
        });
      });
  }
};

module.exports = sessionController;
