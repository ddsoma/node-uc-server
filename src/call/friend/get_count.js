/**
 * Call: friend.get_count
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  return function (params, callback) {

    debug('get count');

    var query = params;

    ns('model.friend_list').count(query, callback);

  }
};
