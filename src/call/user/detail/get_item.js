/**
 * Call: user.detail.get_item
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  return function (params, callback) {
    debug('get item: [%s] %s', params.user_id, params.name);

    if (!(params.user_id > 0)) {
      return callback(ns('model.user_detail_list').missingRequiredFieldError('user_id'));
    }
    if (!params.name) {
      return callback(ns('model.user_detail_list').missingRequiredFieldError('name'));
    }

    ns('model.user_detail_list').get({
      user_id: params.user_id,
      name:    params.name
    }, function (err, item) {
      if (err) return callback(err);
      if (!item) return callback(null, null);
      callback(null, item.value);
    });

  }
};
