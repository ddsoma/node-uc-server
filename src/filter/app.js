/**
 * Filters: app
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, registerFilter, debug) {
  var app = ns('app');

  function app_get_title_by_nameAsync (name, callback) {
    if (!name) return callback(null, '');
    app.call('app.get', {name: name}, function (err, appInfo) {
      callback(null, (appInfo && appInfo.title) || name);
    });
  }
  app_get_title_by_nameAsync.enableCache = true;
  registerFilter('app_get_title_by_nameAsync', app_get_title_by_nameAsync);

  function app_call_checkAsync (app_id, name, callback) {
    if (!(app_id > 0)) return callback(null, false);
    if (!name) return callback(null, false);
    app.call('app.call.check', {
      app_id: app_id,
      name:   name
    }, function (err, ok) {
      if (err) return callback(null, false);
      callback(null, ok);
    });
  }
  app_call_checkAsync.enableCache = true;
  registerFilter('app_call_checkAsync', app_call_checkAsync);

};
