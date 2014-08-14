/**
 * Call: user.history.get_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  return function (params, callback) {

    debug('get history list');
    var user_history_list = ns('model.user_history_list');
    params = utils.cloneObject(params);

    var query = params;

    var options = user_history_list.formatListOptions(params);
    user_history_list.list(query, options, callback);

  }
};
