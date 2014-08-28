/**
 * Call: friend.add
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  return function (params, callback) {

    // params: user_id, friend_id, friend_alias, source, greeting
    debug('send: [%s=>%s]', params.user_id, params.friend_id);

    var query = {
      user_id:   params.user_id,
      friend_id: params.friend_id
    };
    if (!(query.user_id > 0)) {
      return callback(ns('model.friend_list').missingRequiredFieldError('user_id'));
    }
    if (!(query.friend_id > 0)) {
      return callback(ns('model.friend_list').missingRequiredFieldError('friend_id'));
    }

    ns('model.friend_list').get(query, function (err, item) {
      if (item) {
        ns('model.friend_list').updateById(item.id, {
          friend_alias: params.friend_alias,
          greeting:     params.greeting,
          source:       params.source
        }, function (err) {
          if (err) return callback(err);
          onReturn(item.id);
        })
      } else {
        ns('model.friend_list').add(params, function (err, id) {
          if (err) return callback(err);
          onReturn(id);
        });
      }
      function onReturn (id) {
        ns('model.friend_list').getById(id, callback);
      }
    });

  }
};
