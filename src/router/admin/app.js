/**
 * Router: admin app
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router) {

  var app = ns('app');
  var csrf = ns('middleware.csrf');
  var multiparty = ns('middleware.multiparty');
  var checkSignIn = ns('middleware.check_admin_signin');

  router.get('/admin/app/list', checkSignIn, function (req, res, next) {
    res.render('admin/app/list');
  });

  router.delete('/admin/app/list/:id.json', checkSignIn, function (req, res, next) {
    app.call('app.delete', {id: req.params.id}, function (err, ret) {
      if (err) return next(err);
      res.json({success: ret});
    });
  });

};
