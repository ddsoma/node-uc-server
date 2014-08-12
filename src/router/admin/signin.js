/**
 * Router: admin signin
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router) {

  var app = ns('app');
  var csrf = ns('middleware.csrf');
  var multiparty = ns('middleware.multiparty');
  var checkSignIn = ns('middleware.check_admin_signin');

  router.get('/admin/signin', csrf, function (req, res, next) {
    res.render('admin/signin');
  });

  router.post('/admin/signin', multiparty, csrf, function (req, res, next) {
    app.call('admin.check_password', req.body, function (err, ok) {
      if (err) {
        res.setLocals('error', err);
        res.render('admin/signin');
      } else if (!ok) {
        res.setLocals('error', 'Username or password is not correct');
        res.render('admin/signin');
      } else {
        req.session.signin_admin = req.body.name;
        res.redirect(req.query.return_url || '/admin');
      }
    });
  });

};
