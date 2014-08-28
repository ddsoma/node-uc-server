/**
 * Call: message.get_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  var utils = ns('lib.utils');
  return function (params, callback) {

    debug('get list');
    params = utils.cloneObject(params);

    var query = params;

    var options = ns('model.message_list').formatListOptions(params);
    ns('model.message_list').list(query, options, function (err, list) {
      if (err) return callback(err);

      async.mapSeries(list, function (item, next) {

        ns('model.message_origin_list').getById(item.message_id, function (err, message) {
          item.message = message;
          next(err, item);
        })

      }, callback);
    });

  }
};
