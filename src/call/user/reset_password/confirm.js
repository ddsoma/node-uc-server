/**
 * Call user.reset_password.confirm
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {

  var crypto = ns('lib.crypto');

  return function (params, callback) {

    ns('model.user_reset_password_list').getByCode(params.code, function (err, item) {
      if (err) return callback(err);
      if (!item) return callback(new Error('password reset code not exist: ' + params.code));

      // expired: 30min
      var now = new Date().getTime()
      var expired = new Date(item.created_at).getTime() + 1800000;
      if (!(expired > now)) {
        return callback(new Error('password reset code expired: ' + params.code));
      }

      // check
      if (item.is_done) {
        return callback(new Error('password reset code already used: ' + params.code));
      }

      // change password
      var password = crypto.randomString(20);
      ns('model.user_list').updateById(item.user_id, {
        password: password
      }, function (err) {
        if (err) return callback(err);

        ns('model.user_reset_password_list').updateByCode(params.code, {
          is_done:     1,
          finished_at: ns('model.user_reset_password_list').timestamp()
        }, function (err) {
          if (err) return callback(err);

          callback(null, {password: password});
        })
      });
    });

  };
};
