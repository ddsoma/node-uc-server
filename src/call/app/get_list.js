/**
 * Call: app.get_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = ns('lib.utils');
  return function (params, callback) {

    debug('get list');
    var app_list = ns('model.app_list');
    params = utils.cloneObject(params);

    var query = {};

    var options = app_list.formatListOptions(params);
    app_list.list(query, options, callback);

  };
};
