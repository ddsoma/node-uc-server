/**
 * Call: user.history.get_count
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  return function (params, callback) {

    debug('get history count');

    var query = params;

    ns('model.user_history_list').count(query, callback);

  }
};
