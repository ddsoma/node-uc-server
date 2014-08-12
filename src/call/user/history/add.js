/**
 * Call: user.history.add
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  return function (params, callback) {

    debug('add history: [%s] %s', params.id, params.type);

    ns('model.user_history_list').add(params, callback);

  }
};
