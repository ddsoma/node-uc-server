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
UCServer.init({
  port: 3000,
  admin: {
    name:     'admin',
    password: UCServer.encryptPassword('密码')
  }
}).start();
```

启动程序后进入后台: http://127.0.0.1:3000/admin

### 扩展程序

+ 修改登录/注册/注销页面模板
+ 增加第三方登录功能

**本系统基于peento模块编写，扩展方法请参考 https://github.com/peento/peento **

```
// app是一个peento实例
var app = UCServer.init();

// 载入扩展模块
app.use('模块名称或模块所在路径');

// 启动
app.start();
```