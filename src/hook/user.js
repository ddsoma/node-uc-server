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

  // verify email address success
  registerHook('after.user.verify.confirm', {}, function (params, callback) {
    callback();
    app.call('email.send_to_user', {
      user_id:  params.user_id,
      subject:  'welcome!',
      template: 'user/email_verified'
    }, utils.noopCallback);
  });

  // reset password success
  registerHook('after.user.reset_password.confirm', {}, function (params, callback) {
    callback();
    app.call('email.send_to_user', {
      user_id:  params.user_id,
      subject:  'your password has been changed!',
      template: 'user/password_changed'
    }, utils.noopCallback);
  });

};