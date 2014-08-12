/**
 * Call: data.decode
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var app = ns('app');
  return function (params, callback) {

    if (!params.data) return callback(new Error('missing parameter "data"'));

    app.call('app.get', {name: params.app_name}, function (err, appInfo) {
      if (err) return callback(err);
      try {
        var data = JSON.parse(ns('lib.crypto').decryptData(params.data, appInfo.key));
      } catch (err) {
        return callback(err);
      }
      callback(null, data);
    });

  };
};
