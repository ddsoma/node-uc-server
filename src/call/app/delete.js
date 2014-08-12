/**
 * Call: app.delete
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var app = ns('app');
  return function (params, callback) {

    app.call('app.get', params, function (err, appInfo) {
      if (err) return callback(err);

      ns('model.app_list').deleteById(appInfo.id, callback);
    });

  };
};
