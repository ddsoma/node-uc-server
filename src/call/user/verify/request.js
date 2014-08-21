/**
 * Call: user.verify.request
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var app = ns('app');
  var utils = ns('lib.utils');

  return function (params, callback) {

    app.call('user.get', params, function (err, userInfo) {
      if (err) return callback(err);

      ns('model.user_verify_code_list').add({
        user_id: userInfo.id
      }, function (err, id) {
        if (err) return callback(err);

        ns('model.user_verify_code_list').getById(id, function (err, verifyInfo) {
          if (err) return callback(err);

          app.call('email.send_to_user', {
            user_id:  userInfo.id,
            subject:  'verify your email address',
            template: 'user/verify_email',
            data:     verifyInfo
          }, callback);
        });
      });
    })

  };
};
