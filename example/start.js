/**
 * uc-server example
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var path = require('path');
var UCServer = require('uc-server');
var app = UCServer.init({
  debug: true,
  port: 3000,
  url: 'http://www.onlyfactory.com',
  admin: {
    name:     'admin',
    password: UCServer.encryptPassword('123456')
  },
  mysql: {
    host: '127.0.0.1',
    port: 3306,
    user: 'uc_server',
    password: 'uc_server',
    database: 'uc_server',
    pool: 5
  },
  passport: require('./passport_config')
});

app.once('start', function () {
  console.log('server started.');
  test();
});

app.start();


function test () {
  app.ns('model.user_detail_list').add({
    user_id: 1,
    name: 'score3',
    value: 'a20.5'
  }, function (err) {
    console.log(arguments);
    app.ns('model.user_detail_list').list({user_id: 1}, {}, console.log);
  });
}
