/**
 * Call: message.delete
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  return function (params, callback) {

    debug('delete: [%s]', params.id);

    ns('model.message_list').deleteById(params.id, function (err, count) {
      params.affected_rows = count;
      callback(err, params);
    });

  }
};
