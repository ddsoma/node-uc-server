/**
 * Middleware: decode_params
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var app = ns('app');
  return function (req, res, next) {

    if (req.query.app && req.query.data) {
      decode(req.query.app, req.query.data, function (err, data) {
        req.session.client = {
          app: app,
          data: data
        };
        next(err);
      });
    } else {
      next();
    }

  };

  function decode (name, data, callback) {
    app.call('data.decode', {
      app_name: name,
      data:     data
    }, callback);
  }
};
