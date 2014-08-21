/**
 * Router: reset account password
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router) {

  var app = ns('app');
  var utils = ns('lib.utils');
  var csrf = ns('middleware.csrf');
  var multiparty = ns('middleware.multiparty');


  // request to reset password
  router.get('/forgot_password',
  csrf,
  function (req, res, next) {
    res.render('front/forgot_password');
  });

  // submit request
  router.post('/forgot_password',
  multiparty,
  csrf,
  function (req, res, next) {
    app.call('user.reset_password.request', {email: req.body.email}, function (err, ret) {
      if (err) {
        res.context.setLocals('error', err);
      } else {
        res.context.setLocals('is_done', true);
      }
      res.render('front/forgot_password');
    });
  });

  // reset password
  router.get('/reset_password',
  csrf,
  function (req, res, next) {
    if (!req.query.code) return res.redirect('/forgot_password');
    res.render('front/reset_password');
  });

  router.post('/reset_password',
  multiparty,
  csrf,
  function (req, res, next) {
    if (!req.query.code) return res.redirect('/forgot_password');
    app.call('user.reset_password.confirm', {
      code:     req.query.code,
      password: req.body.password
    }, function (err, item) {
      if (err) {
        res.context.setLocals('error', err);
        return res.render('front/reset_password');
      }
      res.context.setLocals('is_done', true);
      res.render('front/reset_password');
    });
  });

};
