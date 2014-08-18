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
  var getClientIP = ns('middleware.get_client_ip');
  var checkSourceAppData = ns('middleware.check_source_app_data');
  var checkPassportUser = ns('middleware.check_passport_user');

  router.get('/signup',
  csrf,
  decodeParams,
  checkSourceAppData,
  checkPassportUser,
  function (req, res, next) {
    res.render('sign/signup');
  });

  router.post('/signup',
  multiparty,
  csrf,
  decodeParams,
  getClientIP,
  checkSourceAppData,
  checkPassportUser,
  function (req, res, next) {
    app.call('user.add', req.body, function (err, id) {
      if (err) {
        res.setLocals('error', err);
        res.render('sign/signup');
      } else {
        app.call('user.get', {id: id}, function (err, info) {
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
            // add history
            app.call('user.history.add', {
              user_id:   info.id,
              type:      'u',
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
