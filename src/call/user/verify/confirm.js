/**
 * Call: user.verify.confirm
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {

  return function (params, callback) {

    ns('model.user_verify_code_list').getByCode(params.code, function (err, item) {
      if (err) return callback(err);
      if (!item) return callback(new Error('account verify code not exist: ' + params.code));

      // expired: 30min
      var now = new Date().getTime()
      var expired = new Date(item.created_at).getTime() + 1800000;
      if (!(expired > now)) {
        return callback(new Error('account verify code expired: ' + params.code));
      }

      // check
      if (item.is_done) {
        return callback(new Error('account verify code already used: ' + params.code));
      }

      // ok
      ns('model.user_list').updateById(item.user_id, {
        is_verified_email: 1
      }, function (err) {
        if (err) return callback(err);

        ns('model.user_verify_code_list').updateByCode(params.code, {
          is_done:     1,
          finished_at: ns('model.user_verify_code_list').timestamp()
        }, function (err) {
          if (err) return callback(err);

          ns('model.user_verify_code_list').getByCode(params.code, callback);
        })
      });
    });

  };
};
