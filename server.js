/**
 * uc-server
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var path = require('path');
var peento = require('peento');

module.exports = function (config) {
  var config = config || {};
  var DEFAULT_CONFIG = require('./default_config');
  Object.keys(DEFAULT_CONFIG).forEach(function (k) {
    if (!(k in config)) {
      config[k] = DEFAULT_CONFIG[k];
    }
  });

  var app = peento(config);

  var ns = app.ns;
  ns('lib.crypto', require('./lib/crypto'));

  app.use(path.resolve(__dirname, 'src'));
  app.start();

  return app;
};
