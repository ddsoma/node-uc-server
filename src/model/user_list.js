/**
 * Model: user_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, createModel, debug) {

  var crypto = ns('lib.crypto');
  var validEmail = require('valid-email');

  var model = createModel({
    connection: ns('db'),
    table:      'user_list',
    primary:    'id',
    limit:      ns('config.model.limit'),
    fields: {
      id:           'number',
      name:         /^[a-z0-9]([a-z0-9]|_|\-){2,49}$/,
      email:        validEmail,
      password:     'string',
      is_valid:     'number',
      created_at:   'number',
      updated_at:   'number',
      is_verified_email: 'number'
    },
    queryFields: ['name', 'email'],
    requiredFields: ['name', 'email', 'password'],
    input: function (data, callback, type) {
      if ('name' in data) {
        data.name = data.name.toLowerCase();
      }
      if (type === 'add') {
        data.is_verified_email = 0;
        data.created_at = model.timestamp();
        if (!('is_valid' in data)) {
          data.is_valid = 1;
        }
      }
      if (type === 'add' || type === 'update2') {
        data.updated_at = model.timestamp();
        if ('password' in data && data.password.length > 0) {
          data.password = crypto.encryptPassword(data.password);
        }
      }
      callback(null, data);
    },
    output: function (data, callback) {
      if (data) {
        data.is_valid = !!data.is_valid;
        data.is_verified_email = !!data.is_verified_email;
        data.created_at = new Date(data.created_at * 1000);
        data.updated_at = new Date(data.updated_at * 1000);
      }
      callback(null, data);
    }
  });

  return model;

};