/**
 * Call: friend.get_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  var utils = ns('lib.utils');
  return function (params, callback) {

    debug('get list');
    params = utils.cloneObject(params);

    var query = params;

    var options = ns('model.friend_list').formatListOptions(params);
    ns('model.friend_list').list(query, options, callback);

  }
};
