/**
 * Call: app.get
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  return function (params, callback) {

    if (params.id > 0) {
      ns('model.app_list').getById(params.id, onCallback);
    } else {
      ns('model.app_list').getByName(params.name, onCallback);
    }

    function onCallback (err, item) {
      if (err) return callback(err);
      if (!item) return callback(new Error('App "' + (params.id || params.name) + '" does not exist'));
      callback(null, item);
    }

  };
};
