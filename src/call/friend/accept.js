/**
 * Call: friend.accept
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  return function (params, callback) {

    debug('accept: [%s]', params.id);

    ns('app').call('friend.get', params, function (err, item) {
      if (err) return callback(err);

      ns('model.friend_list').updateById(item.id, {is_accepted: 1}, function (err) {
        if (err) return callback(err);

        ns('app').call('friend.get', {id: item.id}, callback);
      });
    });

  }
};
