/**
 * Router: admin home
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router) {

  var app = ns('app');
  var csrf = ns('middleware.csrf');
  var multiparty = ns('middleware.multiparty');
  var checkSignIn = ns('middleware.check_admin_signin');

  router.get('/admin', checkSignIn, function (req, res, next) {
    res.render('admin/home');
  });

};
