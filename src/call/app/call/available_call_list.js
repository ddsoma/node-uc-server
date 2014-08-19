/**
 * Call: app.call.available_call_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var AVAILABLE_CALL_LIST = null;
  return function (params, callback) {

    debug('available call list: [%s] %s', params.email, params.display_name);

    if (!Array.isArray(AVAILABLE_CALL_LIST)) {
      var list = [];
      findCallList(ns('call'), '');
      function findCallList (call, prefix) {
        var names = Object.keys(call).sort();
        names.forEach(function (n) {
          if (typeof call[n] === 'function') {
            list.push(prefix + n);
          } else {
            findCallList(call[n], prefix + n + '.');
          }
        });
      }
      AVAILABLE_CALL_LIST = list;
    }

    callback(null, AVAILABLE_CALL_LIST);

  };
};
