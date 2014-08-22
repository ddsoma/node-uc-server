/**
 * Router: signout
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router) {

  var app = ns('app');
  var decodeParams = ns('middleware.decode_params');
  var csrf = ns('middleware.csrf');
  var multiparty = ns('middleware.multiparty');
  var checkSourceAppData = ns('middleware.check_source_app_data');
  var checkPassportUser = ns('middleware.check_passport_user');

  router.get('/signout',
  csrf,
  decodeParams,
  checkSourceAppData,
  checkPassportUser,
  function (req, res, next) {
    res.setLocals('title', 'Sign out');
    app.call('sync.signout', {user: req.session.app_data}, function (err, list) {
      if (err) {
        res.setLocals('error', err);
        res.render('sync/signout');
      } else {
        res.setLocals('sync_list', list);
        res.render('sync/signout');
      }
    });
  });

};
