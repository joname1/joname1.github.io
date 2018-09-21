title: node+koa获取微信授权拿到openid
date: 2018-05-10 18:23:54 +0800
update: 2018-05-10 19:00:00 +0800
author: me
tags:
    - Node
    - Koa2
preview: 因项目是node+koa, 然后需要获取openid, 没办法, 只能搞事情了.

---
#### 流程步骤
* 用户同意，获取code。
* 通过code获取网页授权access_token.
* 获取用户信息。

#### 开始搞事情 :p
```js
import Koa from 'koa'
import path from 'path'
import route from 'koa-route'
import static from 'koa-static'
import keyBody from 'koa-body'

const app = new Koa()

// 路由
import oauth from './routes/accredit/oauth'
import token from './routes/accredit/token'
const rootPath = path.join(__dirname + '/View')
const _static = static(rootPath)
// 中间件
const logger = async(ctx, next) => {
    const rt_start = Date.now()
    await next()
    const rt_end = Date.now()
    ctx.set('X-Response-Time', `${rt_end - rt_start}ms`);
    console.log(ctx.request.method, ctx.url, `${rt_end - rt_start}ms`)
}

app.use(_static) // 静态资源
app.use(keyBody()) // req body数据获取 (非参数序列化)
app.use(logger) // 日志

// page route
app.use(route.get('/oauth', oauth)); //授权
app.use(route.get('/token', token)); //获取openid

app.listen(8088, (err) => {
    if (err) { console.error(err) }
    console.log('Listening At:', 8088)
}
```

#### 1.在APP中访问oauth获取code
```js
import config from './../config'
import request from 'request'
/* 微信网页授权 */
const oauth = async(ctx, next) => {
    const { request: req, response: res } = ctx;        
　　 var AppID = config.AppID;
        var AppSecret = config.AppSecret;
        // 第一步：用户同意授权，获取code
        var Router = 'jy';
        // 这是编码后的地址
        var return_uri = config.return_uri + Router;
        var scope = 'snsapi_base';
        // snsapi_userinfo可以获取用户信息与token与openid
        // snsapi_base只能获取到token与openid
        res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + AppID + '&redirect_uri=' + return_uri + '&response_type=code&scope=' + scope + '&state=123456#wechat_redirect');
}
module.exports = { oauth };
```
config.js里面写好以下配置参数
-  AppID
- AppSecret

#### 2、在客户端访问 tocken,tongguo code获取access_tocken
```js
import config from './../config'
import request from 'request'
import axios from 'axios'

const token = async(ctx, next) => {
    const { request: req, response: res } = ctx
    var code = req.header.referer.match(new RegExp("[\?\&]" + 'code' + "=([^\&]+)", "i"))[1];
    var AppID = config.AppID;
    var AppSecret = config.AppSecret;
    var result = await request.get({
            url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + AppID + '&secret=' + AppSecret + '&code=' + code + '&grant_type=authorization_code',
        },
        function(error, response, body) {
            if (response.statusCode == 200) {
                // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
                // console.log(JSON.parse(body));
                var data = JSON.parse(body);
                var access_token = data.access_token;
                var openid = data.openid;
            } else {
                console.log(response.statusCode);
            }
        }
    );
    ctx.type = 'json';
    ctx.body = result;
}

module.exports = { token }
```
我这里只需要获取到openid即可，所以在这里就已经返回result。
