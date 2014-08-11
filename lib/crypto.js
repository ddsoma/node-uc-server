/**
 * crypto
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var crypto = require('crypto');
var cryptoUtils = exports;


/**
 * MD5
 *
 * @param {string} text
 * @return {string}
 */
exports.md5 = function (text) {
  return crypto.createHash('md5').update(text).digest('hex');
};

/**
 * Eencrypt Password
 *
 * @param {string} password
 * @return {string}
 */
exports.encryptPassword = function (password) {
  var random = cryptoUtils.md5(Math.random() + '' + Math.random()).toUpperCase();
  var left = random.substr(0, 2);
  var right = random.substr(-2);
  var newpassword = cryptoUtils.md5(left + password + right).toUpperCase();
  return [left, newpassword, right].join(':');
};

/**
 * Validate Password
 *
 * @param {string} password
 * @param {string} encrypted
 * @return {bool}
 */
exports.validatePassword = function (password, encrypted) {
  var random = encrypted.toUpperCase().split(':');
  if (random.length < 3) return false;
  var left = random[0];
  var right = random[2];
  var main = random[1];
  var newpassword = cryptoUtils.md5(left + password + right).toUpperCase();
  return newpassword === main;
};

/**
 * Encrypt Data
 *
 * @param {Mixed} data
 * @param {String} secret
 * @return {String}
 */
exports.encryptData = function (data, secret) {
  var str = JSON.stringify(data);
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
};

/**
 * Decrypt Data
 *
 * @param {String} str
 * @param {String} secret
 * @return {Mixed}
 */
exports.decryptData = function (str, secret) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  var data = JSON.parse(dec);
  return data;
};

/**
 * Random String
 *
 * @param {Integer} size
 * @return {String}
 */
exports.randomString = function (size) {
  size = size || 6;
  var code_string = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var max_num = code_string.length + 1;
  var new_pass = '';
  while (size > 0) {
    new_pass += code_string.charAt(Math.floor(Math.random() * max_num));
    size--;
  }
  return new_pass;
};
