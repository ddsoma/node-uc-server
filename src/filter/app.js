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

};
