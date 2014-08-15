/**
 * Call: passport.delete
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  return function (params, callback) {

    debug('delete: [%s]', params.id || params.email);

    ns('app').call('passport.get', params, function (err, item) {
      if (err) return callback(err);

      ns('model.user_connect_list').delete({
        user_id:  item.user_id,
        provider: item.provider
      }, callback);
    });

  }
};
