/**
 * Call: user.update
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  return function (params, callback) {

    debug('update: [%s]', params.id || params.email || params.name);

    ns('app').call('user.get', params, function (err, user) {
      if (err) return callback(err);

      var data = {};
      if ('name' in params) data.name = params.name;
      if ('email' in params) data.email = params.email;
      if ('password' in params) data.password = params.password;
      if ('is_valid' in params) data.is_valid = (utils.parseQueryBool(params.is_valid, false) ? 1 : 0);

      ns('model.user_list').updateById(user.id, data, callback);
    });

  }
};
