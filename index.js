/**
 * uc-server module
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var crypto = require('./lib/crypto');

/**
 * Init uc-server
 *
 * @param {Object} config
 * @return {Object}
 */
exports.init = function (config) {
  return require('./server')(config);
};

exports.encryptPassword = crypto.encryptPassword;
