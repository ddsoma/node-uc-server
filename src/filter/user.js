/**
 * Filters: user
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, registerFilter, debug) {
  var app = ns('app');

  function user_get_name_by_idAsync (id, callback) {
    if (!(id > 0)) return callback(null, '');
    app.call('user.get_info', {id: id}, function (err, userInfo) {
      callback(null, (userInfo && userInfo.name) || '');
    });
  }
  user_get_name_by_idAsync.enableCache = true;
  registerFilter('user_get_name_by_idAsync', user_get_name_by_idAsync);

  registerFilter('user_history_type', function (type) {
    switch (type) {
      case 'i': return 'sign in';
      case 'o': return 'sign out';
      case 'u': return 'sign up';
      default: return 'unknown type "' + type + '"';
    }
  });

};
