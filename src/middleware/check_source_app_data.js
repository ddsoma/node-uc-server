/**
 * Middleware: check_source_app_data
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var app = ns('app');
  return function (req, res, next) {

    if (req.session.app_name && req.session.app_data) {
      res.setLocals('app_name', req.session.app_name);
      res.setLocals('app_data', req.session.app_data);
      next();
    } else {
      next(new Error('cannot get source app info'));
    }

  };
};
