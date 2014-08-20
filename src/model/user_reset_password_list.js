/**
 * Model: user_reset_password_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, createModel, debug) {

  var crypto = ns('lib.crypto');


  var model = createModel({
    connection: ns('db'),
    table:      'user_reset_password_list',
    primary:    'id',
    limit:      ns('config.model.limit'),
    fields: {
      id:          'number',
      code:        'string',
      user_id:     'number',
      is_done:     'number',
      created_at:  'number',
      finished_at: 'number'
    },
    requiredFields: ['code', 'user_id'],
    queryFields: ['code', 'user_id'],
    input: function (data, callback, type) {

      if (type === 'add') {
        data.created_at = model.timestamp();
        data.is_done = 0;
        // genrate random code
        data.code = crypto.randomString(50);
      }
      if ('code' in data) {
        data.code = data.code.toLowerCase();
      }

      callback(null, data);
    },
    output: function (data, callback) {
      if (data) {
        data.created_at = new Date(data.created_at * 1000);
        data.finished_at = new Date(data.finished_at * 1000);
        data.is_done = !!data.is_done;
        data.code = data.code.toLowerCase();
      }
      callback(null, data);
    }
  });


  return model;

};
