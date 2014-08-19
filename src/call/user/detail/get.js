/**
 * Call: user.detail.get
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  return function (params, callback) {
    debug('get detail: [%s]', params.user_id);

    ns('model.user_detail_list').listByUserId(params.user_id, {}, function (err, list) {
      if (err) return callback(err);

      if (utils.parseQueryBool(params.list, false)) {
        return callback(null, list);
      }

      var info = {};
      list.forEach(function (item) {
        info[item.name] = item.value;
      });
      callback(null, info);
    });

  }
};
