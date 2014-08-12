/**
 * Model: app_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, createModel, debug) {

  var crypto = ns('lib.crypto');

  var model = createModel({
    connection: ns('db'),
    table:      'app_list',
    primary:    'id',
    limit:      ns('config.model.limit'),
    fields: {
      id:           'number',
      name:         'string',
      key:          'string',
      client:       'string',
      is_sync:      'number',
      description:  '*',
      created_at:   'number',
      updated_at:   'number'
    },
    queryFields: ['name', 'is_sync'],
    requiredFields: ['name', 'key', 'client'],
    input: function (data, callback, type) {
      if (type === 'add') {
        data.created_at = model.timestamp();
        if (!('is_sync' in data)) {
          data.is_sync = 1;
        }
      }
      if (type === 'add' || type === 'update2') {
        data.updated_at = model.timestamp();
        if ('password' in data) {
          data.password = crypto.encryptPassword(data.password);
        }
      }
      callback(null, data);
    },
    output: function (data, callback) {
      if (data) {
        data.is_sync = !!data.is_sync;
        data.created_at = new Date(data.created_at * 1000);
        data.updated_at = new Date(data.updated_at * 1000);
      }
      callback(null, data);
    }
  });

  return model;

};