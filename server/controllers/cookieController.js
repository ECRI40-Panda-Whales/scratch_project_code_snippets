const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  if (!res.locals.verified) {
    return next({
      log: 'setCookie error',
      status: 400,
      message: { err: 'Invalid username or password' }
    });
  }
  const cookie = res.cookie('ssid', res.locals.verified, { httpOnly: true });
  console.log(res.locals.verified);
  // console.log('cookie response: ', cookie);
  console.log('cookies: ', res.cookie);
  return next();
};
  
module.exports = cookieController;