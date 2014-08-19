/**
 * Call: user.detail.increase_item
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  return function (params, callback) {
    debug('increase item: [%s] %s', params.user_id, params.name);

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
        switch (item.type) {
          case 'i':
            var field = 'int_value';
            break;
          case 'd':
            var field = 'double_value';
            break;
          default:
            var field = 'text_value';
        }
        ns('model.user_detail_list').incr(query, field, params.value, callback);
      } else {
        ns('model.user_detail_list').add(params, callback);
      }
    });

  }
};
