/**
 * Router: signup
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router) {

  var app = ns('app');
  var decodeParams = ns('middleware.decode_params');
  var csrf = ns('middleware.csrf');
  var multiparty = ns('middleware.multiparty');

  router.get('/signup', csrf, decodeParams, function (req, res, next) {
    res.setLocals('data', req.query._data);
    res.render('sign/signup');
  });

  router.post('/signup', multiparty, csrf, decodeParams, function (req, res, next) {
    res.setLocals('data', req.query._data);
    app.call('user.add', req.body, function (err, id) {
      if (err) {
        res.setLocals('error', err);
        res.render('sign/signup');
      } else {
        app.call('user.get_info', {id: id}, function (err, info) {
          if (err) {
            res.setLocals('error', err);
            res.render('sign/signup');
          } else {
            res.setLocals('user_info', info);
            app.call('sync.signup', {user: info}, function (err, list) {
              if (err) {
                res.setLocals('error', err);
                res.render('sign/signup');
              } else {
                res.setLocals('sync_list', list);
                res.render('sync/signup');
              }
            });
          }
        });
      }
    });
  });

};
