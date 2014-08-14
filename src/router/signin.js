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
  var getClientIP = ns('middleware.get_client_ip');

  router.get('/signin', csrf, decodeParams, function (req, res, next) {
    res.setLocals('data', req.query._data);
    res.render('sign/signin');
  });

  router.post('/signin', multiparty, csrf, decodeParams, getClientIP, function (req, res, next) {
    res.setLocals('data', req.query._data);
    app.call('user.check_password', req.body, function (err, ok) {
      if (err) {
        res.setLocals('error', err);
        res.render('sign/signin');
      } else if (!ok) {
        res.setLocals('error', 'Username or password is not correct');
        res.render('sign/signin');
      } else {
        app.call('user.get', req.body, function (err, info) {
          if (err) {
            res.setLocals('error', err);
            res.render('sign/signin');
          } else {
            app.call('sync.signin', {user: info}, function (err, list) {
              if (err) {
                res.setLocals('error', err);
                res.render('sign/signin');
              } else {
                res.setLocals('sync_list', list);
                res.render('sync/signin');
              }
            });
            // add history
            app.call('user.history.add', {
              user_id:   info.id,
              type:      'i',
              client_ip: req.client_ip
            }, function (err) {
              if (err) console.error(err);
            });
          }
        });
      }
    });
  });

};
