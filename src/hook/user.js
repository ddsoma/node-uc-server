/**
 * Hook: user
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, registerHook, debug) {
  var app = ns('app');
  var utils = ns('lib.utils');


  // verify email address
  registerHook('after.user.add', {}, function (params, callback) {
    callback();
    app.call('user.verify.request', {id: params.id}, utils.noopCallback);
  });


};