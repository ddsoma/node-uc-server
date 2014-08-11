/**
 * uc-server example
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var UCServer = require('../');
var app = UCServer.start({
  debug: true,
  port: 3000,
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
  }
});

app.once('start', function () {
  console.log('server started.');
});

app.call('data.encode', {
  app_name: 'test1',
  data: {
    c: 'http://test1.local.ucdok.com:3001/home',
    p: {
      a: Math.random(),
      t: Date.now()
    }
  }
}, console.log);
