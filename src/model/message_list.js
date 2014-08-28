/**
 * Model: message_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, createModel, debug) {

  var crypto = ns('lib.crypto');

  var model = createModel({
    connection: ns('db'),
    table:      'message_list',
    primary:    'id',
    limit:      ns('config.model.limit'),
    fields: {
      id:           'number',
      message_id:   'number',
      sender_id:    'number',
      receiver_id:  'number',
      is_inbox:     'number',
      is_removed:   'number',
      is_read:      'number',
      created_at:   'number'
    },
    queryFields: ['message_id', 'sender_id', 'receiver_id', 'is_inbox', 'is_read', 'is_removed'],
    requiredFields: ['message_id', 'sender_id', 'receiver_id'],
    input: function (data, callback, type) {
      if (type === 'add') {
        data.created_at = model.timestamp();
      }
      if (type === 'get' || type === 'list' || type === 'count') {
        data.is_removed = 0;
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

  // don't really delete
  model.delete = function (query, callback) {
    var me = this;
    me.base.update(query, {
      is_removed: 1
    }, callback);
  };

  return model;

};