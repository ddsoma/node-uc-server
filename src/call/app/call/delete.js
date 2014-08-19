/**
 * Call: app.call.delete
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

    ns('model.app_call_list').delete({
      app_id: params.app_id,
      name:   params.name
    }, callback);

  };
};
