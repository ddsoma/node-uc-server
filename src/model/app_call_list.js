/**
 * Model: app_call_list
 *
 * @author 老雷<leizongmin@gmail.com>
 */

module.exports = function (ns, createModel, debug) {
  var crypto = ns('lib.crypto');
  var utils = ns('lib.utils');

  var model = createModel({
    connection: ns('db'),
    table:      'app_call_list',
    primary:    'app_id',
    limit:      ns('config.model.limit'),
    fields: {
      app_id:     'number',
      name:       'string',
      updated_at: 'number'
    },
    requiredFields: ['app_id', 'name'],
    queryFields: ['app_id', 'name'],
    input: function (data, callback, type) {

      if (type === 'add' || type === 'update2') {
        data.updated_at = model.timestamp();
      }

      callback(null, data);
    },
    output: function (data, callback) {
      if (data) {
        data.updated_at = new Date(data.updated_at * 1000);
      }
      callback(null, data);
    }
  });


  return model;

};
