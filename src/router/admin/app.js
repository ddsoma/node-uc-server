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

  router.get('/admin/app/add', csrf, checkSignIn, function (req, res, next) {
    res.render('admin/app/add');
  });

  router.post('/admin/app/add', multiparty, csrf, checkSignIn, function (req, res, next) {
    app.call('app.add', req.body, function (err, id) {
      if (err) {
        res.setLocals('error', err);
        return res.render('admin/app/add');
      }
      res.redirect('/admin/app/list');
    });
  });

  router.get('/admin/app/edit', csrf, checkSignIn, function (req, res, next) {
    app.call('app.get', req.query, function (err, appInfo) {
      if (err) res.setLocals('error', err);
      res.setLocals('input', appInfo);
      res.render('admin/app/edit');
    });
  });

  router.post('/admin/app/edit', multiparty, csrf, checkSignIn, function (req, res, next) {
    res.setLocals('input', req.body);
    req.body.is_sync = req.body.is_sync || 0;
    app.call('app.update', req.body, function (err, ret) {
      if (err) {
        res.setLocals('error', err);
        return res.render('admin/app/edit');
      }
      res.redirect('/admin/app/list');
    });
  });

  router.post('/admin/app/call.json', multiparty, checkSignIn, function (req, res, next) {
    app.call('app.call.add', req.body, function (err, ret) {
      if (err) return next(err);
      res.json({success: ret});
    });
  });

  router.delete('/admin/app/call.json', multiparty, checkSignIn, function (req, res, next) {
    app.call('app.call.delete', req.body, function (err, ret) {
      if (err) return next(err);
      res.json({success: ret});
    });
  });

};
