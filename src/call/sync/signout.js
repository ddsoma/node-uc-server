/**
 * Call: sync.signout
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  var app = ns('app');
  var utils = ns('lib.utils');
  return function (params, callback) {

    debug('sync signout');

    app.call('app.get_sync_list', {}, function (err, appList) {
      if (err) return callback(err);
      async.mapSeries(appList, function (appInfo, next) {

        app.call('data.encode', {
          app_name: appInfo.name,
          key:      appInfo.key,
          data:     params.user
        }, function (err, authData) {
          next(err, appInfo.client + '/signout/sync?data=' + authData);
        });

      }, callback);
    });

  }
};
