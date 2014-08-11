/**
 * Router: signin
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router) {

  var app = ns('app');
  var decodeParams = ns('middleware.decode_params');
  var csrf = ns('middleware.csrf');
  var multiparty = ns('middleware.multiparty');

  router.get('/signin', csrf, decodeParams, function (req, res, next) {
    res.setLocals('data', req.query._data);
    res.render('sign/signin');
  });

  router.post('/signin', multiparty, csrf, decodeParams, function (req, res, next) {
    res.setLocals('data', req.query._data);
    app.call('user.check_password', req.body, function (err, ok) {
      if (err) {
        res.setLocals('error', err);
        res.render('sign/signin');
      } else if (!ok) {
        res.setLocals('error', 'Username or password is not correct');
        res.render('sign/signin');
      } else {
        app.call('user.get_info', req.body, function (err, info) {
          if (err) {
            res.setLocals('error', err);
            res.render('sign/signin');
          } else {
            // 加密数据，返回给应用
            app.call('sync.signin', {user: info}, function (err, list) {
              if (err) {
                res.setLocals('error', err);
                res.render('sign/signin');
              } else {
                res.setLocals('sync_list', list);
                res.render('sync/signin');
              }
            });
          }
        });
      }
    });
  });

};
