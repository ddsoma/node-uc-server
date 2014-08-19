/**
 * Call: user.detail.delete_item
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  return function (params, callback) {
    debug('delete item: [%s] %s', params.user_id, params.name);

    if (!(params.user_id > 0)) {
      return callback(ns('model.user_detail_list').missingRequiredFieldError('user_id'));
    }
    if (!params.name) {
      return callback(ns('model.user_detail_list').missingRequiredFieldError('name'));
    }

    ns('model.user_detail_list').delete({
      user_id: params.user_id,
      name:    params.name
    }, callback);

  }
};
