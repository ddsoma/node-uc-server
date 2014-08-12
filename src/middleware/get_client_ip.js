/**
 * Middleware: get_client_ip
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var app = ns('app');
  return function (req, res, next) {

    req.client_ip = getRemote(req);
    next();

  };

  function getRemote (req) {
    if (req.headers['x-real-ip']) return req.headers['x-real-ip'];
    return req.socket && (req.socket.remoteAddress || (req.socket.socket && req.socket.socket.remoteAddress));
  };
};
