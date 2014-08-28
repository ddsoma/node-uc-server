/**
 * Call: friend.get
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  var utils = ns('lib.utils');
  return function (params, callback) {

    debug('get: %s', params.id);

    if (params.id > 0) {
      var query = {id: params.id};
    } else {
      var query = {
        user_id:   params.user_id,
        friend_id: params.friend_id
      }
      if (!(query.user_id > 0)) {
        return callback(ns('model.friend_list').missingRequiredFieldError('user_id'));
      }
      if (!(query.friend_id > 0)) {
        return callback(ns('model.friend_list').missingRequiredFieldError('friend_id'));
      }
    }

    ns('model.friend_list').get(params, function (err, item) {
      if (err) return callback(err);
      if (!item) {
        if (query.id > 0) {
          return callback(new Error('This friend info does not exists: ' + params.id));
        } else {
          return callback(new Error('This user is not your friend: ' + params.friend_id));
        }
      }
      callback(null, item);
    });

  }
};
