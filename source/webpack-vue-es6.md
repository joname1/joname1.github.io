title: webpack+vue项目中常用ES6语法总结
date: 2017-06-02 11:23:54 +0800
update: 2017-06-02 12:00:00 +0800
author: me
tags:
    - Webpack
    - ES6
    - Vue
preview: ES6标准虽然已经发布了，但是很多浏览器环境都还不支持，webpack是通过Babel这个转码器将ES6代码转为ES5，从而在现有环境执行。babel是在webpack的配置文件webpack.config.js的module参数中的loaders中配置。

---
### Babel

ES6标准虽然已经发布了，但是很多浏览器环境都还不支持，webpack是通过Babel这个转码器将ES6代码转为ES5，从而在现有环境执行。babel是在webpack的配置文件webpack.config.js的module参数中的loaders中配置，如下：

```js
module.exports = {
	...
	module: {
		loaders: [
		{
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/
		},
		...
		]
	}
}
```

配置完成后还需要安装”babel-loader”模块

```js
npm i babel-loader -D
```

然后webpack就可以对用了ES6语法的js文件进行转码了。下面总结一些常用到的ES6语法。

### let和const命令

* let命令

ES6中let命令用来声明变量，用法类似于var，但是let所声明的变量是局部变量，只在let命令所在的代码块内有效。所以在for循环中很适合用let变量做计数器。
let变量不会像var变量那样会进行变量提升，变量一定要在声明后使用，否则会报错。
只要块级作用域内存在let命令，它所声明的所有变量都绑定这个作业域，不收外部变量的影响，即形成了一个封闭的作用域。
let不允许在相同作用域内重复声明同一个变量。可以看出，let变量实际上为JavaScript新增了块级作用域

* const命令

const声明一个只读的常量，一旦声明，值就不能改变。所以，const一旦声明就必须立即初始化，不能只声明不初始化。
const作用域和let命令相同，只在声明所在的块级作用域中有效。const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

### 函数的扩展

* 函数参数的默认值

在ES6之前不能直接为函数的参数指定默认值，只能采用变通的方法。ES6允许为函数参数设置默认值，直接写在参数定义的后面。

```js
function log(x, y='World') {
	console.log(x, y);
}
log('Hello')
```

* 参数默认值的位置

通常定义了默认值的参数应该是函数的尾参数，如果是非尾部的参数设置默认值，实际上这个参数是没法省略的。除非显式输入undefined。

* 箭头函数

ES6允许使用“箭头”（=>）定义函数。

```js
var f = v => v;
```

上述函数等同于：

```js
var f = function(v) {
	return v;
};
```

若箭头函数不需要参数或者需要多于一个参数，就使用一个圆括号代表参数部分。

```js
var f = () => 5;
// 等同于
var f = function() {
	return 5;
}
```

```js
var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
	return num1 + num2;
}
```

若箭头函数的代码部分多于一条语句，就要使用大括号将他们括起来，并且使用return语句返回。

```js
var sum = (num1, num2) => { return num1 + num2; }
```

#### 使用注意点

函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
不可当做构造函数，不可以使用new命令，否则会抛出错误。
不可使用arguments对象，该对象在函数体内不存在，可以用Rest参数代替。

### Module

ES6之前，JavaScript一直没有模块（module）体系，ES6在语言规格的层面上，实现了模块功能，完全可以取代现有的CommonJS和AMD规范，成为浏览器和服务器通用的模块解决方案。
ES6模块不是对象，而是通过export命令显式指定输出的代码，输入时采用静态命令的形式。

```js
import {stat, exists, readFile} from 'fs';
```

上面代码就是从fs模块加载3个方法，其他方法不加载。这种加载成为“编译时加载”。ES6可以在编译时就完成模块加载，效率要比CommonJS模块的加载方式高。

### export命令

模块功能主要由两个命令构成，export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。

```js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
```

还可以如下写：

```js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
export {firstName, lastName, year};
```

export除了输出变量通用可以输出函数或者类，export输出的变量还可以用as关键字重命名。

```js
function v1() { ... }
function v2() { ... }
export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

### import命令

使用export命令定义了模块的对外接口以后，其他JS文件就可以通过import命令加载这个模块（文件）。用法上面已经有介绍，如果想为输入的变量重命名，使用as关键字。

```js
import { lastName as surname } from './profile';
```