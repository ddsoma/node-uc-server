/**
 * Call: app.update
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  return function (params, callback) {

    debug('update: [%s]', params.id || params.email);

    ns('app').call('app.get', params, function (err, appInfo) {
      if (err) return callback(err);

      var data = {};
      if ('name' in params) data.name = params.name;
      if ('key' in params) data.key = params.key;
      if ('client' in params) data.client = params.client;
      if ('title' in params) data.title = params.title;
      if ('description' in params) data.description = params.description;
      if ('is_sync' in params) data.is_sync = (utils.parseQueryBool(params.is_sync, false) ? 1 : 0);

      ns('model.app_list').updateById(appInfo.id, data, callback);
    });

  }
};
