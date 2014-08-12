/**
 * Model: user_history_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, createModel, debug) {

  var crypto = ns('lib.crypto');

  var model = createModel({
    connection: ns('db'),
    table:      'user_history_list',
    primary:    'id',
    limit:      ns('config.model.limit'),
    fields: {
      id:           'number',
      user_id:      'number',
      type:         'string',
      timestamp:    'number',
      client_ip:    'string'
    },
    queryFields: ['user_id', 'type', 'client_ip'],
    requiredFields: ['user_id', 'type'],
    input: function (data, callback, type) {
      if (type === 'add') {
        data.timestamp = model.timestamp();
      }
      callback(null, data);
    },
    output: function (data, callback) {
      if (data) {
        data.timestamp = new Date(data.timestamp * 1000);
      }
      callback(null, data);
    }
  });

  return model;

};