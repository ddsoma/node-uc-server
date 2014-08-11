/**
 * uc-server example
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var UCServer = require('../');
UCServer.start({
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
}).once('start', function () {
  console.log('server started.');
});
