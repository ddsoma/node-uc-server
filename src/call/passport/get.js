/**
 * Call: passport.get
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  return function (params, callback) {
    debug('get info: [%s] %s', params.provider, params.user_id || params.unique_id);

    var query = {};
    if (params.user_id > 0) {
      query.user_id = params.user_id;
    } else if (params.unique_id) {
      query.unique_id = params.unique_id;
    } else {
      return callback(ns('model.user_connect_list').missingRequiredFieldError('user_id'));
    }
    if (!params.provider) {
      return callback(ns('model.user_connect_list').missingRequiredFieldError('provider'));
    }
    query.provider = params.provider;

    ns('model.user_connect_list').get(query, function (err, user) {
      if (err) return callback(err);
      if (!user) return callback(new Error('User connect info does not exist'));
      callback(null, user);
    });

  }
};
