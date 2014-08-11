/**
 * Call: app.get_sync_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  return function (params, callback) {

    debug('get sync list');

    ns('model.app_list').list({is_sync: 1}, {limit: 999999}, callback);

  }
};
