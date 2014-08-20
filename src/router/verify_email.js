/**
 * Verify account email address
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router) {

  var app = ns('app');
  var utils = ns('lib.utils');
  var csrf = ns('middleware.csrf');
  var multiparty = ns('middleware.multiparty');

  router.get('/verify_email',
  csrf,
  function (req, res, next) {
    if (req.query.code) {
      app.call('user.verify.confirm', {
        code: req.query.code
      }, function (err, item) {
        if (err) {
          res.context.setLocals('error', err);
          return res.render('front/verify_email');
        }
        res.context.setLocals('is_success', true);
        res.render('front/verify_email');
      });
    } else {
      res.render('front/verify_email');
    }
  });

  router.post('/verify_email',
  multiparty,
  csrf,
  function (req, res, next) {
    app.call('user.verify.request', {email: req.body.email}, function (err, ret) {
      if (err) {
        res.context.setLocals('error', err);
      } else {
        res.context.setLocals('is_done', true);
      }
      res.render('front/verify_email');
    });
  });


};
