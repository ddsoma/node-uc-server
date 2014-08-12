/**
 * Router: admin user
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router) {

  var app = ns('app');
  var csrf = ns('middleware.csrf');
  var multiparty = ns('middleware.multiparty');
  var checkSignIn = ns('middleware.check_admin_signin');

  router.get('/admin/user/list', checkSignIn, function (req, res, next) {
    app.call('user.get_list', req.query, function (err, list) {
      if (err) res.setLocals('error', err);
      res.setLocals('users', list);
      res.render('admin/user/list');
    });
  });

  router.delete('/admin/user/list/:id.json', checkSignIn, function (req, res, next) {
    app.call('user.delete', {id: req.params.id}, function (err, ret) {
      if (err) return next(err);
      res.json({success: ret});
    });
  });

  router.get('/admin/user/add', csrf, checkSignIn, function (req, res, next) {
    res.render('admin/user/add');
  });

  router.post('/admin/user/add', multiparty, csrf, checkSignIn, function (req, res, next) {
    app.call('user.add', req.body, function (err, id) {
      if (err) {
        res.setLocals('error', err);
        return res.render('admin/user/add');
      }
      res.redirect('/admin/user/list');
    });
  });

  router.get('/admin/user/edit', csrf, checkSignIn, function (req, res, next) {
    app.call('user.get_info', req.query, function (err, appInfo) {
      if (err) res.setLocals('error', err);
      res.setLocals('input', appInfo);
      res.render('admin/user/edit');
    });
  });

  router.post('/admin/user/edit', multiparty, csrf, checkSignIn, function (req, res, next) {
    res.setLocals('input', req.body);
    req.body.is_valid = req.body.is_valid || 0;
    if (!req.body.password) delete req.body.password;
    app.call('user.update', req.body, function (err, ret) {
      if (err) {
        res.setLocals('error', err);
        return res.render('admin/user/edit');
      }
      res.redirect('/admin/user/list');
    });
  });

};
