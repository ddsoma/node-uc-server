/**
 * Call: user.get_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  return function (params, callback) {

    debug('get list');
    var user_list = ns('model.user_list');
    params = utils.cloneObject(params);

    var query = params;

    var options = user_list.formatListOptions(params);
    user_list.list(query, options, callback);

  }
};
