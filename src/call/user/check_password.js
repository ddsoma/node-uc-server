/**
 * Call: user.check_password
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  var crypto = ns('lib.crypto');
  return function (params, callback) {

    debug('check password: [%s] %s', (params.email || params.name), params.password);
    var user_list = ns('model.user_list');

    if (params.login) {
      if (params.login.indexOf('@') === -1) {
        params.name = params.login;
      } else {
        params.email = params.login;
      }
    }

    if (!params.email && !params.name) {
      return callback(user_list.missingRequiredFieldError('login'));
    }
    if (!params.password) {
      return callback(user_list.missingRequiredFieldError('password'));
    }

    if (params.name) {
      var method = 'getByName';
      var value = params.name;
    } else {
      var method = 'getByEmail';
      var value = params.email;
    }

    user_list[method](value, function (err, user) {
      if (err) return callback(err);
      if (!(user && user.password)) return callback(null, false);
      callback(null, crypto.validatePassword(params.password, user.password));
    });

  }
};
