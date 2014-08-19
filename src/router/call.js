/**
 * Router: call
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router) {

  var app = ns('app');
  var decodeParams = ns('middleware.decode_params');
  var csrf = ns('middleware.csrf');
  var multiparty = ns('middleware.multiparty');
  var getClientIP = ns('middleware.get_client_ip');
  var checkSourceAppData = ns('middleware.check_source_app_data');
  var checkPassportUser = ns('middleware.check_passport_user');


  function returnError (res, err) {
    res.json({error: err.toString()});
  }

  router.get('/call.json',
  function (req, res, next) {
    // get app info
    app.call('app.get', {name: req.body.app}, function (err, appInfo) {
      if (err) return returnError(res, err);
      req.appInfo = appInfo;
      next();
    });
  },
  function (req, res, next) {
    // get call name
    app.call('data.decode', {
      app_name: req.body.app,
      data:     req.body.name
    }, function (err, ret) {
      if (err) return returnError(res, err);
      req.callName = ret;
      next();
    });
  },
  function (req, res, next) {
    // get call params
    app.call('data.decode', {
      app_name: req.body.app,
      data:     req.body.params
    }, function (err, ret) {
      if (err) return returnError(res, err);
      req.callParams = ret;
      next();
    });
  },
  function (req, res, next) {
    // check app available list
    app.call('app.call.check', {
      app_id: req.appInfo.id,
      name:   req.callName
    }, function (err, ok) {
      if (err) return returnError(res, err);
      if (!ok) return returnError(res, new Error('Permission denied: you don\'t have permission to call "' + req.callName + '"'));
      next();
    });
  },
  function (req, res, next) {
    app.call(req.callName, req.callParams, function (err, ret) {
      if (err) return returnError(res, err);
      res.json({data: ret});
    });
  });

};
