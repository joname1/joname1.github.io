---
title: Node.js(1) 封装,调用,执行,访问路径,http,函数编程,等待函数,事件监听
date: 2016-10-1 15:53:07
tags: [nodejs,node.js]
---
# 1.如何封装一个模块；
首先，我们建立一个js文件，例如命名为test.js；
然后在里面写一个函数，函数名任意；
然后通过exports.变量名，将函数赋值给这个变量；
如代码：
<!-- more -->
```js
function test(){    //请注意这个函数名
    console.log("1");
}
exports.testBegin= test;   //等号后面的test，指的是上面的函数名。等号前面的testBegin，是调用时的函数名（注意区别）
```
这个test.js的文件就写完了，这是一个模块，他的效果是调用该函数后，输出1；
另外，不要问我这个exports是什么，我暂时也不知道。

# 2.如何调用一个模块
在封装模块的前提下，我们新建一个文件，例如a.js，来调用之前封装的test.js模块；
方法是：
```js
var test = require("./test");   //调用该模块
test.testBegin();   //调用该模块的方法（注意方法名是test.js中exports后面的变量名）；
```
注意调用时的方法名，并非是test.js中的函数名test；

# 3.如何执行一个Node.js的文件
我们现在需要执行a.js这个调用了封装模块的文件了，执行他的方法，和执行普通的node.js的文件的方法并没有什么不同；
在a.js这个文件的目录下，打开命令行。windows是shift＋鼠标右键；
像下面这样输入即可：
然后将输出1，感觉执行执行Python文件那样

# 4.获得访问者想要访问的路径
![](http://img.blog.csdn.net/20160602214711294)
首先上图，其中pathname指的是路径；而query指的是请求之类的东西（暂时不关心）；
假如我们想要获得pathname（即字符串“start”），我们该怎么办呢？
方法：
* ①首先，需要获取访问者需要访问的路径，方法是通过http的方法createServer
具体来说：
我们先require一个http模块：
```js
var http = require("http");
```
然后调用其方法，创建一个服务器：
```js
http.createServer(onRequest).listen(8888);
```
注意，这个方法监听的是8888端口，其参数是一个函数；
 
然后我们书写这个函数的内容：
```js
function onRequest(request, response) {
    console.log(request.url);
}
```
这个函数的第一个参数request是用户访问的一些东西，我们需要的是其url变量；假设我们访问地址是这样的：
``http://127.0.0.1:8888/index/loading?start``
请注意红色部分，那么服务器在console.log输出的是
```
/index/loading?start
```

* ②我们下来要对这个url做点什么了；
虽然直接对上面那个参数进行操纵也可以，但这太笨了，让我们来require一个新的模块url
```js
var url = require("url");
```

* ③调用这个新模块的方法parse，将第一步获得的url地址，作为其参数，再调用其方法pathname，就可以获得我们想要的东西了；
具体而言，需要这么一段代码：
```js
var pathname = url.parse(request.url).pathname;
```
这个pathname就是我们需要的东西了；
 
把所有代码综合起来，是这样的：
```js
var http = require("http");
var url = require("url");
function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " recived.");
    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("Hello word!");
    response.end();
}
http.createServer(onRequest).listen(8888);
console.log("Server has started!");
```
然后运行之：
 
我们随便访问一个本地的地址：
``http://127.0.0.1:8888/index/loading?start``
 
发现，/index/loding这部分被正常的显示出来了。
另外，favicon.ico是该网站的图标，据说很多服务器是会默认读取的；
 
假如我们直接访问：``http://127.0.0.1:8888``，显示是这样的
![](http://img.blog.csdn.net/20160602214745169)

# 5.关于http
我们之前有了这么一段代码（已delete掉无关部分）：
```js
var http = require("http");
function onRequest(request, response) {
    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("Hello word!");
    response.end();
}
http.createServer(onRequest).listen(8888);
```
其中，http调用了NodeJs自带的一个模块“http”，而这个模块是一个服务器模块；
而createServer是这个模块的方法，效果是返回一个对象，而这个对象有一个listen的方法；
当然，由于你和我，也许都是新手，因此我们尚没有搞清楚这个到底是怎么运作的；但如果有一定经验的话，可以猜到，这个listen是监听，监听的是8888端口；如果去掉这部分会怎么样？经过测试，服务器并没有运行，如图：
 
而onRequest函数呢，从名字可以猜到，这个函数的效果是“当请求的时候做些什么”，我们来看其函数：
```js
function onRequest(request, response) {
    response.writeHead(200);
    response.write("Hello word!");
    response.end();
}
```
这个函数有两个参数：request和response，顾名思义，请求和响应。
request请求指用户访问的时候，相关的信息；
response指服务器的响应，会做些什么；这个函数的三个方法，都是response相关的；
 
* 第一个：response.writeHead方法，具体来说，就是HTTP响应报文的头行；
这个指HTTP通信的响应报文中的头部分，如果没有基础的话，暂时不需要关心，写200即可，这里的200，是约定俗称的请求成功时的返回；
具体搜：
``response.writeHead(statusCode,[reasonPhrase], [headers])``
 
* 第二个：response.write方法，具体来说，是HTTP响应报文；
简单理解，负责发送正文中的一部分，可以同时发送多个不一样的；
在上面搜：
``response.write(chunk,encoding='utf8')``
 
* 第三个：response.end方法，具体来说每一个响应的结束，必须要调用这个方法，然后服务器会认为这条信息已经发送完毕了。

综合效果来说，当我们访问：``http://127.0.0.1:8888/``时，浏览器会出现：
``Hello world!``

# 6.函数式编程
所谓函数式编程，简单的理解，就是将函数作为参数传递；
目前有四个文件：
``index.js``
```js
var server = require("./server");   //调用该模块
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);   //调用该模块的方法（注意方法名是test.js中exports后面的变量名）
```

``server.js``
```js
var http = require("http");
var url = require("url");
function start(route, handle) {
    var count = 0;

    function onRequest(request, response) {
        console.log(count++ + "#:");
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " recived.");

        route(handle, pathname);    //来源于上面的start的参数

        response.writeHead(200);
        response.write("Hello word!");
        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started!");
}
exports.start = start;
```

``router.js``
```js
function route(handle, pathname) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname]();
    } else {
        console.log("No request handler found for " + pathname);
    }
}

exports.route = route;
```

``requestHandler.js``
```js
function start() {
    console.log("Request handler 'start' was called");
}

function upload() {
    console.log("Request handler 'upload' was called");
}

exports.start = start;
exports.upload = upload;
```
分析：
* ①首先看index.js，他调用了3个模块，然后声明了一个空的对象，然后给这个对象声明了几个不同的变量（准确的说是函数变量），他们分别对应requestHandlers这个模块的不同函数；
 
调用server这个模块的start方法，传两个参数，分别是router模块的route方法和对象handle（包含3个函数变量）；
 
* ②由于调用了server模块的start方法，因此我们来看server模块；
在server模块中，调用了两个模块，分别是http和url，这两个都是NodeJs自带的，具体里面的内容就不一一分析了（前面已经说明过了）。
 
在servre模块的start函数（也是index.js调用的方法），有两个参数，第一个参数是route函数（来源于router模块），第二个参数是一个对象（来源于index.js）。
 
而在start函数中，调用了其第一个参数（route函数），由于这个参数是函数，因此运行它，给其两个参数，分别是handle（来源于index.js的对象）和pathname（来源于当前模块，是用户请求的路径）；
 
因此接下来我们看router模块的route函数，记得，这个函数传递了一个对象和一个路径；
 
* ③在router模块中，传递了两个参数，并进行了一次判断；
判断的逻辑是这样的，第一个参数（是一个对象），其加上下标后的值，如果是类型是函数，那么执行这个函数；如果不是函数，提示没找到该句柄；
 
请注意，为什么说这个对象加上下标是函数呢，原因在于index中声明的这个对象，而这个对象的三个带下标的变量都是函数；
 
而这三个被执行函数来源于哪呢？来源于index里加载的模块requestHandlers，那么最后让我们来看看这个模块；
 
* ④在这个模块里，只有两个函数，分别是start和upload；
这两个函数输出不同的内容（一个关键字是start，另一个关键字是upload）；
请回想之前的下标，下标分为三个，分别是空（/），start下标（/start），和upload下标（/upload），因此当用户访问根目录、start目录、和upload目录时，调用对应的方法，而若访问其他目录（包括start目录的子目录等时，提示错误——来源于router模块）；
![](http://img.blog.csdn.net/20160602214830419)
现在回顾这种模式是怎么实现的：
![](http://img.blog.csdn.net/20160602214835576)

# 7.等待函数
```js
function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date() < startTime + milliSeconds);  //等待参数的时间
}
```
传的参数是毫秒，在这个时间前，无法执行下一句代码，类似C++的Sleep()函数

# 8.返回的两种格式
```js
response.writeHead(200, {"Content-Type": "text/html"});
response.write(content);
response.end();
```
其中，writeHead里面的第二个参数，有多种格式，分别是：
application/xml 、 text/xml、text/html、text/plain
经查：
text/html是html格式的正文 
text/plain是无格式正文
text/xml忽略xml头所指定编码格式而默认采用us-ascii编码
application/xml会根据xml头指定的编码格式来编码：
简单来说，html就是返回一个html，plain就是无格式的，写什么就是什么，xml就是一个xml文件；

# 9.关于事件监听
之前说到有
```js
function onRequest(request, response)
```
这样一个回调函数，其中request是请求，response是回应；
根据推测，每次request的，都会触发至少一个data，一个end事件，因此应该监听这两个事件。（并且只有接受到data之后，才会接收到end事件）；
我们之前是不监听的，只要有请求，就直接执行某个函数，而监听表示只有这些事件触发后，我们才会执行某一段代码。
因此我们这么写：
```js
var postData = "";
request.setEncoding("utf8");
request.addListener("data", function (postDataChunk) {      //data事件
    postData += postDataChunk;
    console.log("Received POST data chunk " + postDataChunk + ".");
    console.log("————————");
})
request.addListener("end", function () {
    route(handle, pathname, response, postData);
})
```
表示监听的编码类型为UTF8，监听data事件，把内容加起来，监听end事件，把加起来的内容发送出去。
直到end事件触发时，才会执行之前写的route函数（也就是那个写回复的函数）。
 
PS：
根据我的测试，如果data事件注释掉，end事件会无法执行，准确的说，是无法访问任何url的。
但是，如果不注释掉，只是普通的访问的话，可是又不会触发data监听事件里面的console.log代码，很奇怪； 
另外，注释掉end事件，留着data事件，也会卡住； 