/**
 * Model: message_origin_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, createModel, debug) {

  var crypto = ns('lib.crypto');

  var model = createModel({
    connection: ns('db'),
    table:      'message_origin_list',
    primary:    'id',
    limit:      ns('config.model.limit'),
    fields: {
      id:           'number',
      object_type:  'string',
      object_id:    'number',
      content:      '*',
      created_at:   'number'
    },
    queryFields: ['object_type', 'object_id'],
    requiredFields: ['object_type'],
    input: function (data, callback, type) {
      if (type === 'add') {
        data.created_at = model.timestamp();
      }
      if (type === 'add' || type === 'update2') {
        if ('object_type' in data) {
          data.object_type = data.object_type.toLowerCase().trim();
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