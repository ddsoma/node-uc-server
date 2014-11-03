/**
 * Call: user.add
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var validEmail = require('valid-email');
  return function (params, callback) {

    debug('add: [%s] %s', params.email, params.display_name);
    var user_list = ns('model.user_list');

    if (!(params.name && /^[a-z0-9]([a-z0-9]|_){2,49}$/.test(params.name))) {
      return callback(new Error('Username may only contain alphanumeric characters or dashes and cannot begin with a dash'));
    }
    if (!(params.email && validEmail(params.email))) {
      return callback(new Error('Invalid email address'));
    }

    user_list.getByEmail(params.email, function (err, user) {
      if (err) return callback(err);
      if (user) return callback(new Error('User email "' + params.email + '" already exist'));

      user_list.getByName(params.name, function (err, user) {
        if (err) return callback(err);
        if (user) return callback(new Error('User name "' + params.name + '" already exist'));

        user_list.add(params, function (err, id) {
          if (err) return callback(err);

          user_list.getById(id, callback);
        });
      });
    });

  }
};
