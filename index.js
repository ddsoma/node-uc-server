/**
 * uc-server module
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var crypto = require('./lib/crypto');

/**
 * Start uc-server
 *
 * @param {Object} config
 * @return {Object}
 */
exports.start = function (config) {
  return require('./server')(config);
};

exports.encryptPassword = crypto.encryptPassword;
