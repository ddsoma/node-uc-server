/**
 * Locals: config
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, registerLocals, debug) {
  var app = ns('app');
  var utils = ns('lib.utils');

  registerLocals('config', function (name, callback, context) {
    callback(null, ns('config'));
  });

};