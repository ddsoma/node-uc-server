/**
 * Call: admin.check_password
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var crypto = ns('lib.crypto');
  return function (params, callback) {
    debug('check password: [%s] %s', params.name, params.password);

    if (!params.name) {
      return callback(new Error('missing parameter "name"'));
    }
    if (!params.password) {
      return callback(new Error('missing parameter "password"'));
    }

    if (params.name !== ns('config.admin.name')) return callback(null, false);

    callback(null, crypto.validatePassword(params.password, ns('config.admin.password')));

  };
};
