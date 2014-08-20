/**
 * Call: user.reset_password.request
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {

  var app = ns('app');

  return function (params, callback) {

    app.call('user.get', params, function (err, userInfo) {
      if (err) return callback(err);

      ns('model.user_reset_password_list').add({
        user_id: userInfo.id
      }, function (err, id) {
        if (err) return callback(err);
        ns('model.user_reset_password_list').getById(id, function (err, verifyInfo) {
          if (err) return callback(err);

          app.call('email.notify_user', {
            user_id:  userInfo.id,
            subject:  'reset your password',
            template: 'user/reset_password',
            data:     verifyInfo
          }, callback);
        });
      });
    })

  };
};
