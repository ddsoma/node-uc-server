/**
 * Call: message.send
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  return function (params, callback) {

    // params: sender_id, receiver_id, object_type, object_id, content
    debug('send: [%s=>%s] %s:%s', params.sender_id, params.receiver_id, params.object_type, params.object_id);

    var message_id;
    async.series([

      function (next) {
        ns('model.message_origin_list').add({
          object_type: params.object_type,
          object_id:   params.object_id,
          content:     params.content
        }, function (err, id) {
          message_id = id;
          next(err);
        });
      },

      function (next) {
        ns('model.message_list').add({
          message_id:   message_id,
          sender_id:    params.sender_id,
          receiver_id:  params.receiver_id,
          is_inbox:     0
        }, next);
      },

      function (next) {
        ns('model.message_list').add({
          message_id:   message_id,
          sender_id:    params.sender_id,
          receiver_id:  params.receiver_id,
          is_inbox:     1
        }, next);
      }

    ], function (err) {
      if (err) return callback(err);

      ns('model.message_origin_list').getById(message_id, function (err, item) {
        if (item) {
          item.sender_id = params.sender_id;
          item.receiver_id = params.receiver_id;
        }
        callback(err, item);
      });
    });

  }
};
