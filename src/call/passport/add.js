/**
 * Call: passport.add
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  return function (params, callback) {

    debug('add: [%s] %s', params.email, params.display_name);

    ns('model.user_connect_list').add(params, callback);

  }
};
