/**
 * Call: user.detail.update_item
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  return function (params, callback) {
    debug('update item: [%s] %s', params.user_id, params.name);

    if (!(params.user_id > 0)) {
      return callback(ns('model.user_detail_list').missingRequiredFieldError('user_id'));
    }
    if (!params.name) {
      return callback(ns('model.user_detail_list').missingRequiredFieldError('name'));
    }
    if (!('value' in params)) {
      return callback(ns('model.user_detail_list').missingRequiredFieldError('value'));
    }

    var query = {
      user_id: params.user_id,
      name:    params.name
    };
    ns('model.user_detail_list').get(query, function (err, item) {
      if (err) return callback(err);
      if (item) {
        ns('model.user_detail_list').update(query, {
          value:   params.value
        }, callback);
      } else {
        ns('model.user_detail_list').add(params, callback);
      }
    });

  }
};
