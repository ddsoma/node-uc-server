/**
 * Call: app.add
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  return function (params, callback) {

    debug('add: [%s] %s', params.email, params.display_name);
    var app_list = ns('model.app_list');

    app_list.getByName(params.name, function (err, user) {
      if (err) return callback(err);
      if (user) return callback(new Error('App name "' + params.name + '" already exist'));

      app_list.add(params, callback);
    });

  };
};
