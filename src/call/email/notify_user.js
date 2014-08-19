/**
 * Call email.notify_user
 *
 * @author 老雷<leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  var app = ns('app');


  // params
  // user_id:
  // subject:
  // text: text content
  // html: html content
  // template: if did not provide text or html, need to provide a template name
  // data: template data
  return function (params, callback) {

    if (!(params.user_id > 0)) {
      return callback(new Error('missing required parameter "user_id'));
    }

    app.call('user.get', {id: params.user_id}, function (err, userInfo) {
      if (err) return callback(err);

      params.to = userInfo.email;
      params.data = params.data || {};
      params.data.user_info = userInfo;
      params.from = ns('config.email.noReply') || ns('config.email.from');
      app.call('email.send', params, callback);
    });

  };

};
