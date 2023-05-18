const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  if (!res.locals.verified) {
    return next({
      log: 'setCookie error',
      status: 400,
      message: { err: 'Invalid username or password' }
    });
  }
  res.cookie('ssid', res.locals.verified, { httpOnly: true });

  return next();
};
  
module.exports = cookieController;