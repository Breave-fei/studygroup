var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var routers = require('./routes/routers');
var ueditorRouter = require('./routes/ueditorRouter');
var userRouter = require('./routes/userRouter');
var classRouter = require('./routes/classRouter');
var newsRouter = require('./routes/newsRouter');



var app = express();  // 初始化请求实例app
let cors = require("cors");  // 生成token和验证token是否正确的函数
let { getToken } = require('./utils/token');  //验证token是否过期，并规定哪些路由不用验证token
let expressJwt = require('express-jwt');


app.use(cors());  // 后端解决跨域
app.use(logger('dev'));  // 使用log日志记录插件
app.use(express.json());  // 获取post请求传递的数据
app.use(express.urlencoded({ extended: false }));  // post请求格式兼容urlencoded表单提交方式
app.use(cookieParser());  // 解析cookie
app.use(express.static(path.join(__dirname, 'public')));  // 静态文件，开启访问内置资源 css，js，images
app.use(express.static(path.join(__dirname, 'static')));  // 静态文件，开启访问内置资源 css，js，images


// 1、告诉express框架模板文件所在的位置
app.set('views', path.join(__dirname, 'views'));
// 2、告诉express框架模板后缀是什么
app.set('view engine', 'art');
// 3、当渲染后缀为art模板时，所使用的模板引擎是什么
app.engine('art', require('express-art-template'));


//====================验证token==================
//解析token获取用户信息
app.use(function (req, res, next) {
  //**调用接口时 设置axios(ajax)请求头Authorization的格式为`Bearer ` +token
  let token = req.headers['authorization'];
  if (token == undefined) {
    next();
  } else {
    getToken(token).then((data) => {
      if (data) {
        req.token = data;
        // console.log('token封装到req中', req.token);
      }
      next();
    }).catch((error) => {
      next();
    })
  }
});
//验证token是否过期并规定那些路由不需要验证
app.use(expressJwt({
  secret: 'lufei',  // 验证所需秘钥
  // 加密算法
  algorithms: ['HS256']
}).unless({
  path: ['/login', '/getrouter', '/ueditor', '/ueditor/uploads', '/ueditor/config.js']  //不需要验证的接口名称
}))

//token失效返回信息
app.use(function (err, req, res, next) {
  if (err.status == 401) {
    res.status(401).send('token失效！')
  } else {
    next()
  }
})
//====================验证token==================



app.use(userRouter);
app.use(routers);
app.use(classRouter);
app.use(ueditorRouter);
app.use(newsRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// 监听端口
app.listen(3333, () => console.log('3000 running ...'));
module.exports = app;
