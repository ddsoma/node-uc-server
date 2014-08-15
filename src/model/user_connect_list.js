/**
 * Model: user_connect_list
 *
 * @author 老雷<leizongmin@gmail.com>
 */

module.exports = function (ns, createModel, debug) {
  var crypto = ns('lib.crypto');

  var model = createModel({
    connection: ns('db'),
    table:      'user_connect_list',
    primary:    'user_id',
    limit:      ns('config.model.limit'),
    fields: {
      user_id:    'number',
      provider:   'string',
      unique_id:  'string',
      created_at: 'number'
    },
    requiredFields: ['user_id', 'provider', 'unique_id'],
    queryFields: ['user_id', 'provider', 'unique_id'],
    input: function (data, callback, type) {

      if (type === 'add') {
        data.created_at = model.timestamp();
      }

      if (type === 'add' || type === 'update2') {
        if ('provider' in data) {
          data.provider = data.provider.toLowerCase().trim();
        }
      }

      callback(null, data);
    },
    output: function (data, callback) {
      if (data) {
        data.created_at = new Date(data.created_at * 1000);
      }
      callback(null, data);
    }
  });


  return model;

};
