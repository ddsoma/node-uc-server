/**
 * Router: signin
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router) {

  var decodeParams = ns('middleware.decode_params');

  router.get('/signin', decodeParams, function (req, res, next) {
    res.json(req.query);
  });

};
