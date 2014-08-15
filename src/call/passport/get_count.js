/**
 * Call: passport.get_count
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  return function (params, callback) {

    debug('get count');

    var query = params;

    ns('model.user_connect_list').count(query, callback);

  }
};
