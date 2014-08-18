/**
 * Model: user_detail_list
 *
 * @author 老雷<leizongmin@gmail.com>
 */

module.exports = function (ns, createModel, debug) {
  var crypto = ns('lib.crypto');
  var utils = ns('lib.utils');

  var model = createModel({
    connection: ns('db'),
    table:      'user_detail_list',
    primary:    'user_id',
    limit:      ns('config.model.limit'),
    fields: {
      user_id:    'number',
      name:       'string',
      type:       'string',
      int_value:  'number',
      double_value: 'number',
      text_value: '*',
      created_at: 'number'
    },
    requiredFields: ['user_id', 'name', 'type'],
    queryFields: ['user_id', 'name', 'type'],
    input: function (data, callback, type) {

      if (type === 'add') {
        data.created_at = model.timestamp();
      }

      if (type === 'add' || type === 'update2') {
        if ('provider' in data) {
          data.provider = data.provider.toLowerCase().trim();
        }
        if ('value' in data) {
          var v = data.value;
          if (utils.isNumber(v)) {
            if (utils.isInteger(v)) {
              data.type = 'i';
              data.int_value = v;
            } else {
              data.type = 'd';
              data.double_value = v;
            }
          } else {
            data.type = 't';
            data.text_value = v;
          }
        }
      }

      if ('type' in data) {
        data.type = data.type.toLowerCase();
      }

      callback(null, data);
    },
    output: function (data, callback) {
      if (data) {
        data.created_at = new Date(data.created_at * 1000);
        switch (data.type) {
          case 'i':
            data.value = data.int_value;
            break;
          case 'd':
            data.value = data.double_value;
            break;
          default:
            data.value = data.text_value;
        }
        delete data.int_value;
        delete data.double_value;
        delete data.text_value;
      }
      callback(null, data);
    }
  });


  return model;

};
