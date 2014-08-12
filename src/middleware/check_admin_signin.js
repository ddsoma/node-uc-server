/**
 * Check Admin Sign In
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  return function (req, res, next) {

    if (req.session && req.session.signin_admin && req.session.signin_admin === ns('config.admin.name')) {
      return next();
    }

    res.redirect('/admin/signin?return_url=' + req.url);

  };
};
