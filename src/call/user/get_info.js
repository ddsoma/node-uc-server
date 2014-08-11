/**
 * Call: user.get_info
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  return function (params, callback) {
    debug('get info: [%s]', params.email || params.name || params.id);

    if (params.login) {
      if (params.login.indexOf('@') === -1) {
        params.name = params.login;
      } else {
        params.email = params.login;
      }
    }

    if (params.id > 0) {
      var field = 'Id';
      var value = params.id;
    } if (params.name) {
      var field = 'Name';
      var value = params.name;
    } else {
      var field = 'Email';
      var value = params.email;
    }

    ns('model.user_list')['getBy' + field](value, function (err, user) {
      if (err) return callback(err);
      if (!user) return callback(new Error('User ' + field.toLowerCase() + ' "' + value + '" does not exists'));
      callback(null, user);
    });

  }
};
