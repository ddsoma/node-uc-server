/**
 * Filters: passport
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, registerFilter, debug) {
  var app = ns('app');

  function passport_list_by_user_idAsync (user_id, callback) {
    if (!(user_id > 0)) return callback(null, []);
    app.call('passport.get_list', {user_id: user_id}, function (err, list) {
      if (err) return callback(null, []);
      callback(null, list);
    });
  }
  passport_list_by_user_idAsync.enableCache = true;
  registerFilter('passport_list_by_user_idAsync', passport_list_by_user_idAsync);

};
