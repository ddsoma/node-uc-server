/**
 * Model: friend_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, createModel, debug) {

  var crypto = ns('lib.crypto');

  var model = createModel({
    connection: ns('db'),
    table:      'friend_list',
    primary:    'id',
    limit:      ns('config.model.limit'),
    fields: {
      id:           'number',
      user_id:      'number',
      friend_id:    'number',
      friend_alias: '*',
      source:       '*',
      greeting:     '*',
      is_accepted:  'number',
      created_at:   'number',
      updated_at:   'number',
    },
    queryFields: ['user_id', 'friend_id', 'source', 'is_accepted'],
    requiredFields: ['user_id', 'friend_id'],
    input: function (data, callback, type) {
      if (type === 'add') {
        data.created_at = model.timestamp();
      }
      if (type === 'add' || type === 'update2') {
        data.updated_at = model.timestamp();
        if ('source' in data) {
          data.source = data.source.toLowerCase().trim();
        }
      }
      callback(null, data);
    },
    output: function (data, callback) {
      if (data) {
        data.is_accepted = !!data.is_accepted;
        data.created_at = new Date(data.created_at * 1000);
        data.updated_at = new Date(data.updated_at * 1000);
      }
      callback(null, data);
    }
  });

  return model;

};