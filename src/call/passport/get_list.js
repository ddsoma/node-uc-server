/**
 * Call: passport.get_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  return function (params, callback) {

    debug('get list');
    var user_connect_list = ns('model.user_connect_list');
    params = utils.cloneObject(params);

    var query = params;

    params.order = params.order || 'created_at:desc';
    var options = user_connect_list.formatListOptions(params);
    user_connect_list.list(query, options, callback);

  }
};
