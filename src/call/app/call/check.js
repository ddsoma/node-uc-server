/**
 * Call: app.call.check
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  return function (params, callback) {

    if (!(params.app_id > 0)) {
      return callback(ns('model.app_call_list').missingRequiredFieldError('app_id'));
    }
    if (!params.name) {
      return callback(ns('model.app_call_list').missingRequiredFieldError('name'));
    }

    ns('model.app_call_list').get({
      app_id: params.app_id,
      name:   params.name
    }, function (err, item) {
      if (err) return callback(err);
      callback(null, !!item);
    });

  };
};
