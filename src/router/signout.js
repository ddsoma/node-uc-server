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

  router.get('/signout', csrf, decodeParams, function (req, res, next) {
    res.setLocals('data', req.query._data);
    app.call('sync.signout', {user: (req.query._data.p || {})}, function (err, list) {
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
