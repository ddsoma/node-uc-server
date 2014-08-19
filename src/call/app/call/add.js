/**
 * Call: app.call.add
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var app = ns('app');
  return function (params, callback) {

    debug('add: [%s] %s', params.app_id, params.name);

    app.call('app.call.check', params, function (err, ok) {
      if (err) return callback(err);
      if (ok) return callback(null, ok);

      ns('model.app_call_list').add(params, callback);
    });

  };
};
