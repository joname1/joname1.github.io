title: node.js学习笔记(1)
date: 2018-04-21 18:23:54 +0800
update: 2018-04-21 19:00:00 +0800
author: me
tags:
    - Node
preview: 引入模块等不作记录。从 Buffer 章节开始记录笔记。

---
## Buffer

Buffer 支持的编码格式："ascii", "utf8", "utf16le", "ucs2", "base64" 和 "hex"。（默认是utf-8）

写入缓冲区的方法：write（string,offeset,length,encoding);

参数解释：

* string：写入的字符串值
* offeset：写入的位置，默认为 0，可以不填
* length：写入长度，默认为 str.length, 可以不填
* encoding：编码格式，默认为 utf-8 可以不填

从缓冲区读取数据方法：buf.toString(encoding,start,end);
参数均可不填，有默认值，与 write 保持一致。

## Express
框架核心特性：

* 可以设置中间件来响应 HTTP 请求。
* 定义了路由表用于执行不同的 HTTP 请求动作。
* 可以通过向模板传递参数来动态渲染 HTML 页面。

请求和响应：
```js
//get
app.get('/', (req, res) => {
    // ...
})
//post
app.post('/', (req, res) => {
   //  ...
})
```

* Request 常见属性：

```js
req.app：当callback为外部文件时，用来访问express的实例
req.baseUrl：获取路由当前安装的URL路径
req.body / req.cookies：获得「请求主体」/ Cookies
req.fresh / req.stale：判断请求是否还「新鲜」
req.hostname / req.ip：获取主机名和IP地址
req.originalUrl：获取原始请求URL
req.params：获取路由的parameters
req.path：获取请求路径
req.protocol：获取协议类型
req.query：获取URL的查询参数串
req.route：获取当前匹配的路由
req.subdomains：获取子域名
req.accpets()：检查请求的Accept头的请求类型
req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages
req.get()：获取指定的HTTP请求头
req.is()：判断请求头Content-Type的MIME类型
```

* Response 常见属性：

```js
res.app：同req.app一样
res.append()：追加指定HTTP头
res.set()在res.append()：后将重置之前设置的头
res.cookie(name,value,[option])：设置Cookie=> opition: domain,expires,httpOnly,maxAge,path,secure,signed
res.clearCookie()：清除Cookie
res.download()：传送指定路径的文件
res.get()：返回指定的HTTP头
res.json()：传送JSON响应
res.jsonp()：传送JSONP响应
res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
res.redirect()：设置响应的Location HTTP头，并且设置状态码302
res.send()：传送HTTP响应
res.sendFile(path,[options],[fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
res.set()：设置HTTP头，传入object可以一次设置多个头
res.status()：设置HTTP状态码
res.type()：设置Content-Type的MIME类型
```
