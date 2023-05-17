const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  if (!res.locals.verified) {
    return next({
      log: 'error',
      message: { err: 'Invalid username or password' }
    });
  }
  res.cookie('ssid', res.locals.verified, { httpOnly: true });
  return next();
};
  
module.exports = cookieController;