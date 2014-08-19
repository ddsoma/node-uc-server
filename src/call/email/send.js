/**
 * Call email.send
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var fs = require('fs');
  var path = require('path');
  var nodemailer = require('nodemailer');
  var tinyliquid = require('tinyliquid');
  var async = require('async');

  var smtpTransport = nodemailer.createTransport('SMTP', ns('config.email'));
  var tplRenders = {};


  // get template real filename
  function resolveTemplate (name) {
    var views = ns('view');
    name = 'email/' + name;
    return views[name] || views[name + '.liquid'];
  }

  // render template
  function render (tpl, data, callback) {
    debug('render email template: %s', tpl);
    if (typeof tplRenders[tpl] !== 'function') {
      debug('compile email template: %s', tpl);
      fs.readFile(resolveTemplate(tpl), {encoding: 'utf8'},
      function (err, text) {
        if (err) return callback(err);
        try {
          tplRenders[tpl] = tinyliquid.compile(text);
        } catch (err) {
          return callback(err);
        }
        startRender();
      });
    } else {
      startRender();
    }
    function startRender () {
      var fn = tplRenders[tpl];
      var context = tinyliquid.newContext({
        locals: data
      });
      fn(context, function (err) {
        callback(err, context.getBuffer());
      });
    }
  }

  // params:
  // to: [user1@mail.com, user2@mail.com]
  // from: sender, default: config.email.from
  // subject:
  // text: text content
  // html: html content
  // template: if did not provide text or html, need to provide a template name
  // data: template data
  return function (params, callback) {

    if (!params.to) {
      return callback(new Error('missing required parameter "to"'));
    }
    if (Array.isArray(params.to)) {
      params.to = params.to.join(', ');
    }
    if (!params.subject) {
      return callback(new Error('missing required parameter "subject"'));
    }
    if (!(params.text || params.html || params.template)) {
      return callback(new Error('missing required parameter "text" or "html" or "template"'));
    }

    debug('send email to: %s [%s]', params.to, params.subject);

    if (params.text || params.html) {
      startSend();
    } else {
      render(params.template, params.data, function (err, html) {
        if (err) return callback(err);
        params.html = html;
        startSend();
      });
    }

    function startSend () {
      var mailOptions = {
        from:    params.from || ns('config.email.from'),
        to:      params.to,
        subject: params.subject,
        text:    params.text,
        html:    params.html
      };

      smtpTransport.sendMail(mailOptions, function(err, res){
        if (err) {
          debug('send email error: [%s] %s', params.to, err);
        } else {
          debug('send email success: [%s] %s', params.to, res.message);
        }
        callback(err, res);
      });
    }

  };

};
