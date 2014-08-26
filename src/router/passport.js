/**
 * Router: passport
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router, debug) {

  var path = require('path');
  var passport = require('passport');
  var app = ns('app');
  var decodeParams = ns('middleware.decode_params');
  var csrf = ns('middleware.csrf');
  var multiparty = ns('middleware.multiparty');
  var getClientIP = ns('middleware.get_client_ip');
  var checkSourceAppData = ns('middleware.check_source_app_data');
  var checkPassportUser = ns('middleware.check_passport_user');

  var BASE_URL = ns('config.url');
  if (!BASE_URL) throw new Error('Please provide "config.url"');

  var init = passport.initialize();
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  ns('passport.init', init);
  ns('passport.module', passport);

  router.get('/passport/connect/successed',
  getClientIP,
  checkSourceAppData,
  checkPassportUser,
  function (req, res, next) {
    if (!req.session.passport) {
      return next(new Error('cannot get passport session'));
    }
    var connectInfo = req.session.passport.user;
    connectInfo.id = connectInfo.username || connectInfo.id;
    app.call('passport.get', {
      provider:  connectInfo.provider,
      unique_id: connectInfo.id
    }, function (err, item) {
      if (item) {
        // sign in success
        app.call('user.get', {id: item.user_id}, function (err, userInfo) {
          if (err) return next(new Error('cannot get user info: ' + err));
          delete req.session.passport;
          app.call('sync.signin', {user: userInfo}, function (err, list) {
            if (err) {
              res.setLocals('error', err);
              res.render('sign/signin');
            } else {
              res.setLocals('sync_list', list);
              res.render('sync/signin');
            }
          });
          // add history
          app.call('user.history.add', {
            user_id:   userInfo.id,
            type:      'i',
            client_ip: req.client_ip
          }, function (err) {
            if (err) console.error(err);
          });
        });
      } else {
        // first sign in, need to bind an account
        res.redirect('/signup?bind=1');
      }
    });
  });
  function redirectToSuccessed (req, res, next) {
    res.redirect('/passport/connect/successed');
  }


  var IS_WINDOWS = (process.platform.substr(0, 3).toLowerCase() === 'win');
  function tryLoadModule (name) {
    var paths = path.resolve('.').split(/\\|\//);
    if (IS_WINDOWS) paths.shift();
    for (var i = paths.length; i >= 0; i--) {
      var dir = '/' + paths.slice(0, i).join('/') + '/node_modules/' + name;
      if (dir[0] === '/' && dir[1] === '/') dir = dir.slice(1);
      try {
        debug('tryLoadModule: %s', dir);
        var m = require(dir);
        return m;
      } catch (err) { }
    }
    throw new Error('Fail to load module "' + name + '"')
  }

  ns('config.passport.enable').forEach(function (provider) {
    var pkgName = 'passport-' + provider;
    var configPrefix = 'config.passport.' + provider;
    var urlPrefix = '/passport/' + provider;
    try {
      var Strategy = tryLoadModule(pkgName).Strategy;
    } catch (err) {
      console.log('==========================================================');
      console.error('Fail to load module "' + pkgName + '"');
      console.log('==========================================================');
      throw err;
    }

    var callbackURL = ns(configPrefix + '.callbackURL');
    callbackURL = callbackURL || BASE_URL + urlPrefix + '/callback';
    ns(configPrefix + '.callbackURL', callbackURL);

    passport.use(new Strategy(ns(configPrefix), function(accessToken, refreshToken, profile, done) {
      done(null, profile);
    }));
    router.get(urlPrefix, passport.authenticate(provider, {session: false}));
    router.get(urlPrefix + '/callback', init, passport.authenticate(provider), redirectToSuccessed);
  });

};
