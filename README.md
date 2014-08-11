node-uc-server
==============

Node.js版本的ucenter服务器端

### 安装

```bash
$ npm install uc-server
```

### 使用方法

启动程序:

```javascript
var UCServer = require('uc-server');
UCServer.start({
  port: 3000,
  admin: {
    name:     'admin',
    password: UCServer.encryptPassword('密码')
  }
});
```

启动程序后进入后台: http://127.0.0.1:3000/admin

