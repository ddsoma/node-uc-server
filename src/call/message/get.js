/**
 * Call: message.get
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  var utils = ns('lib.utils');
  return function (params, callback) {

    debug('get: %s', params.id);

    ns('model.message_list').getById(params.id, function (err, item) {
      if (err) return callback(err);
      if (!item) return callback(new Error('This message does not exist: ' + params.id));

      ns('model.message_origin_list').getById(item.message_id, function (err, message) {
        item.message = message;
        callback(err, item);
      })
    });

  }
};
