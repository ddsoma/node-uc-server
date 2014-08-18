/**
 * Call: passport.add
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  return function (params, callback) {

    debug('add: [%s] %s => %s', params.provider, params.unique_id, params.user_id);

    ns('model.user_connect_list').add(params, callback);

  }
};
