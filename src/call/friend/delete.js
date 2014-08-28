/**
 * Call: friend.delete
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  return function (params, callback) {

    debug('delete: [%s]', params.id);

    ns('app').call('friend.get', params, function (err, item) {
      if (err) return callback(err);

      ns('model.friend_list').deleteById(item.id, function (err, count) {
        item.affected_rows = count;
        callback(err, item);
      });
    });

  }
};
