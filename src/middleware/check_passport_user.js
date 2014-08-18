/**
 * Middleware: check_passport_user
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var app = ns('app');
  return function (req, res, next) {

    if (req.query.clear_connect == '1') {
      delete req.session.passport;
    }

    if (req.session.passport && req.session.passport.user) {
      res.setLocals('connect_info', req.session.passport.user);
    }

    next();

  };
};
