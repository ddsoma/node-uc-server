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


  router.get('/reset_password',
  csrf,
  function (req, res, next) {
    if (req.query.code) {
      // set new password
      app.call('user.reset_password.confirm', {
        code: req.query.code
      }, function (err, item) {
        if (err) {
          res.context.setLocals('error', err);
          return res.render('front/reset_password');
        }
        res.context.setLocals('new_password', item.password);
        res.render('front/reset_password');
      });
    } else {
      // request to reset password
      res.render('front/forgot_password');
    }
  });
  router.post('/reset_password',
  multiparty,
  csrf,
  function (req, res, next) {
    // confirm reset
    app.call('user.reset_password.request', {email: req.body.email}, function (err, ret) {
      if (err) {
        res.context.setLocals('error', err);
      } else {
        res.context.setLocals('is_done', true);
      }
      res.render('front/forgot_password');
    });
  });


};
