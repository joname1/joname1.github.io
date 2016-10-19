---
title: Node.js(3) 模块
date: 2016-10-3 16:59:47
tags: [node.js,nodejs]
---
当我们制作一个模块时，我们可能会写一个构造函数（因为在浏览器写构造函数时我们经常会这么做）。
<!-- more -->
如代码：
```js
function sayHello() {  
    this.say = function () {  
        console.log('hello');  
    }  
}  
exports.Hello = sayHello;  
```
在这里，我们有一个构造函数sayHello，函数里有一个方法say，输出hello。
然后导出的是sayHello这个构造函数。我们在另外一个文件中调用它。
代码这么写：
```js
var hello = require('./test').Hello;    //调用刚才写的那个模块  
var m = new hello();  
m.say();  
```
第一行表示我们调用刚才写的那个模块。
注意，这个时候和之前不同（之前是直接require模块即可），这里需要添加一个Hello。原因在于require表示导入的是一个整体（即有多个exports导出的方法），这里我们只需要其中的Hello方法（即对应原模块中的sayHello这个构造函数）；
 
当然，也可以写为require('./test')，在下面的代码，把hello改为hello.Hello即可。
 
第二行代码表示生成一个这个构造函数的实例（还记得js里如何调用构造函数么？构造函数是不能直接调用其方法的）；
 
第三行代码表示调用这个实例的say方法（即模块中的this.say=的那个函数）；
 
这个流程是：
请求模块==>生成函数的实例==>调用函数的方法
 
 
我们也可以在导出的时候，用另一种方法：
```js
module.exports = sayHello;
```
然后调用这个模块
```js
var hello = require('./test');    //调用刚才导入的那个文件  
m = new hello();  
m.say();  
```
这个时候hello就是这个函数，然后生成一个实例，调用其方法。
 
但我觉得有个潜在问题，这个模块里只能有这一个函数（不是很确定）。我验证结果如下：
修改之前的模块：
```js
function sayHello() {  
    this.say = function () {  
        console.log('hello');  
    }  
}  
function say() {  
    console.log("say");  
}  
module.exports = sayHello;  
exports.say = say;  
```
调用其的模块：
```js
var hello = require('./test');    //调用刚才导入的那个文件  
console.log(hello.say)  
```
显示是undefined，而正常情况下（删除module.exports = sayHello;这一行）应该显示：
![](http://img.blog.csdn.net/20160612154252163)
经过查询，这种用法的作用在于，假如我们只想将一个对象封装到模块中，就这么用。
 
另外，不可以直接对exports进行赋值以替代（module.exports这种用法）。
按照说明，这个变量会在模块执行结束后被释放，但module.exports不会。