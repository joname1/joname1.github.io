title: JavaScript ES6核心特性概述
date: 2016-12-24 11:23:54 +0800
update: 2016-12-24 12:00:00 +0800
author: me
tags:
    - ES6
preview: JavaScript在过去几年里发生了很大的变化。ECMAScript是JavaScript的一个重要标准，但它并不是JavaScript唯一的部分，当然，也不是唯一被标准化的部分。这里有12个新功能，您可以学习使用它们！

---
JavaScript在过去几年里发生了很大的变化。这里有12个新功能，您可以学习使用它们！

![](http://css88.b0.upaiyun.com/css88/2016/10/es6-core-features-overview-large.png)
## JavaScript历史

新增加的语言称为ECMAScript 6。它也称为ES6或ES2015 +。

自从 1995年提出的JavaScript构想以来，发展进展非常缓慢。每隔几年新增一次。1997年以来 ECMAScript 一直作为JavaScript实现的基础，引导JavaScript 发展。它已经发布了好几个版本，如ES3，ES5，ES6等。

> ECMAScript与JavaScript的关系：

> ECMA-262标准的描述如下：“ ECMAScript 可以为不同种类的宿主环境提供核心的脚本编程能力，因此核心的脚本语言时与任何特定的宿主环境分开进行规定的。”简单地说，ECMAScript描述了以下内容：语法、类型、语句、关键字、保留字、运算符、对象等。

> ECMAScript是JavaScript的一个重要标准，但它并不是JavaScript唯一的部分，当然，也不是唯一被标准化的部分。比如在WEB前端开发中，Web浏览器对于ECMAScript来说是一个宿主环境，但它并不是唯一的宿主环境。事实上，还有不计其数的其他各种环境(例如目前很火的Node.js
)。一个完整的JavaScript实现是由以下3个不同部分组成的：核心(ECMAScript)、文档对象模型(DOM)、浏览器对象模型(BOM)。

> 正如你所看到的，ES3，ES5和ES6之间分别存在10年和6年的时间间隔。目前ECMAScript发展的新模式是每年进行少量变更。而不是像ES6一样做大量的更改。

## 浏览器支持

![](http://css88.b0.upaiyun.com/css88/2016/10/es6-javascript-support.png)

所有现代浏览器和环境都已经支持ES6了！Chrome，MS Edge，Firefox，Safari，Node等等已经内置支持JavaScript ES6的大部分功能。所以，你在本教程中学到的一切，你可以立即开始使用它。

让我们开始使用 ECMAScript 6 吧！

## 核心ES6特性

变量的块作用域

在过去声明变量使用 var，而在ES6中，声明变量还可以使用 let / const。

var 有什么问题？

var 的问题是变量会被泄漏到其他代码块，例如 for 循环或 if 代码块。
```js
ES5 代码:
var x = 'outer';
function test(inner) {
  if (inner) {
    var x = 'inner'; // 作用域是整个function
    return x;
  }
  return x; //被重新定义，因为第4行声明被提升
}
test(false); // undefined 
test(true); // inner
```
上面代码中，对于test(false) 你可能期望的是返回 outer, 但是不是, 你得到的是 undefined。

为什么?

因为即使 if 代码块没有被执行，第4行中的表达式var x也是被提升的。

> var 变量提升
> var是函数作用域。它在整个函数中是可用的，甚至在被声明之前。
> 初始化 不 提升。如果你使用var ，请总是在顶部声明你的变量。
> 应用提升规则后我们可以更好地了解发生了什么：

```js
ES5 代码:
var x = 'outer';
function test(inner) {
  var x; // 提升声明
  if (inner) {
    x = 'inner'; // 初始化不提升
    return x;
  }
  return x;
}
```
用ECMAScript 6 来拯救：
```js
ES6 代码:
let x = 'outer';
function test(inner) {
  if (inner) {
    let x = 'inner';
    return x;
  }
  return x; // 从第1行获得预期结果
}
test(false); // outer
test(true); // inner
```
从var改用 let,使代码按你设想的那样执行。 if 代码块没有被执行，变量x不会从if 代码块中被提升。

let 提升 和 “暂时性死区”

在ES6中，let将把变量提升到代码块的顶部（不是像ES5那样的函数顶部）。
但是，代码块中，在变量声明之前引用这个变量会导致一个 ReferenceError 错误。
let是块作用域。在声明之前不能使用它。
“暂时性死区”是指从代码块开始直到变量被声明的区域。
## IIFE

在解释LIFE之前，让我们举个例子。 看看这里：
```js
ES5 代码:
{
  var private = 1;
}
console.log(private); // 1
```
正如你所看到的，变量private 被泄漏到了代码块外面。你需要使用IIFE（immediately-invoked function expression，即：立即调用函数表达式）来包含它：

```js
ES5 代码:
(function(){
  var private2 = 1;
})();
console.log(private2); // 未捕获 ReferenceError
```

如果你看看jQuery / lodash或其他开源项目，您将注意到他们使用IIFE以避免污染全局环境并只是在全局定义，如 _，$ 或 jQuery 。

在ES6中更干净，如果我们只是现在某个代码块中使用使用某个变量，我们可以使用let，再也不需要使用IIFE了：
```js
ES6 代码:
{
  let private3 = 1;
}
console.log(private3); // 未捕获 ReferenceError
```
## Const

如果你想要一个变量一直不改变，你也可以使用 const。

![](http://css88.b0.upaiyun.com/css88/2016/10/javascript-es6-const-variables-example.png)

底线：var 区分 let 和 const。

对于所有引用使用const; 避免使用var。
如果你必须重新分配引用（愚人码头注：变量需要重新赋值的），使用let而不是const。

## 模板字面量(Template Literals)

当我们有了模板字面量，我们就不需要做更多的嵌套连接。看一看：
```js
ES5 代码:
var first = 'Adrian';
var last = 'Mejia';
console.log('Your name is ' + first + ' ' + last + '.');
```
现在你可以使用反引号 ( ` ` ) 和插值字符串 ${};
```js
ES6 代码:
const first = 'Adrian';
const last = 'Mejia';
console.log(`Your name is ${first} ${last}.`);
```
ES6的模板字面量没有转义、循环、条件判断等内置语法，感觉功能还很弱。

## 多行字符串

我们不必在连接字符串时需要加 \n，就像这样：
```js
ES5 代码:
var template = '<li *ngFor="let todo of todos" [ngClass]="{completed: todo.isDone}" >\n' +
'  <div class="view">\n' +
'    <input class="toggle" type="checkbox" [checked]="todo.isDone">\n' +
'    <label></label>\n' +
'    <button class="destroy"></button>\n' +
'  </div>\n' +
'  <input class="edit" value="">\n' +
'</li>';
console.log(template);
```
在ES6中，我们可以再次使用反引号来解决这个问题：
```js
ES6 代码:
const template = `<li *ngFor="let todo of todos" [ngClass]="{completed: todo.isDone}" >
  <div class="view">
    <input class="toggle" type="checkbox" [checked]="todo.isDone">
    <label></label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="">
</li>`;
console.log(template);
```
这两段代码将等到完全相同的结果。

## 解构分配

ES6解构非常有用和简洁。 按照这个例子：

从数组中获取元素
```js
ES5 代码:
var array = [1, 2, 3, 4];
var first = array[0];
var third = array[2];
console.log(first, third); // 1 3
```
等价于：
```js
ES6 代码:
const array = [1, 2, 3, 4];
const [first, ,third] = array;
console.log(first, third); // 1 3
```
交换值
```js
ES5 代码:
var a = 1;
var b = 2;
var tmp = a;
a = b;
b = tmp;
console.log(a, b); // 2 1
```
等价于：
```js
ES6 代码:
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1
```
多个返回值的解构
```js
ES5 代码:
function margin() {
  var left=1, right=2, top=3, bottom=4;
  return { left: left, right: right, top: top, bottom: bottom };
}
var data = margin();
var left = data.left;
var bottom = data.bottom;
console.log(left, bottom); // 1 4
```
在第3行，你也可以在一个数组中返回它像这样（并保存一些类型）：
```js
js 代码:
return [left, right, top, bottom];
```
但是调用者需要顾及到返回数据的顺序。
```js
js 代码:
var left = data[0];
var bottom = data[3];
```
使用ES6，调用者只需要选择他们需要的数据（第6行）：
```js
ES6 代码:
function margin() {
  const left=1, right=2, top=3, bottom=4;
  return { left, right, top, bottom };
}
const { left, bottom } = margin();
console.log(left, bottom); // 1 4
```
注意：第3行，我们可以看到ES6的一些其他特性。我们可以压缩{left：left}为{left}。看看它比 ES5 简洁了很多。是不是很酷？

## 参数匹配的解构
```js
ES5 代码:
var user = {firstName: 'Adrian', lastName: 'Mejia'};
function getFullName(user) {
  var firstName = user.firstName;
  var lastName = user.lastName;
  return firstName + ' ' + lastName;
}
console.log(getFullName(user)); // Adrian Mejia
```
等价于：
```js
ES6 代码:
const user = {firstName: 'Adrian', lastName: 'Mejia'};
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
console.log(getFullName(user)); // Adrian Mejia
```
## 深度匹配
```js
ES5 代码:
function settings() {
  return { display: { color: 'red' }, keyboard: { layout: 'querty'} };
}
var tmp = settings();
var displayColor = tmp.display.color;
var keyboardLayout = tmp.keyboard.layout;
console.log(displayColor, keyboardLayout); // red querty
```
等价于：
```js
ES6 代码:
function settings() {
  return { display: { color: 'red' }, keyboard: { layout: 'querty'} };
}
const { display: { color: displayColor }, keyboard: { layout: keyboardLayout }} = settings();
console.log(displayColor, keyboardLayout); // red querty
```
这也称为对象解构。

正如你所看到的，解构是非常有用的，并鼓励良好的编码风格。

最佳实践：

使用数组解构来获取元素或交换变量。它可以避免创建临时引用。
对于函数多个返回值不要使用数组解构，而使用对象解构。

## 类与对象

使用ECMAScript 6，我们可以从“构造函数”过渡到“类”。

在JavaScript中每一个对象都有一个原型，这是另一个对象。所有JavaScript对象继承了它们原型中的方法和属性。

在ES5中，我们面向对象编程（OOP）需要使用构造函数来创建对象，如下：
```js
ES5 代码:
var Animal = (function () {
  function MyConstructor(name) {
    this.name = name;
  }
  MyConstructor.prototype.speak = function speak() {
    console.log(this.name + ' makes a noise.');
  };
  return MyConstructor;
})();
var animal = new Animal('animal');
animal.speak(); // animal makes a noise.
```
在ES6中，我们有一些语法糖。我们可以用较少的板式代码，以及class和constructor等新的关键字做同样的事情。
另外，请注意我们如何清楚地定义方法constructor.prototype.speak = function () vs speak()：
```js
ES6 代码:
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}
const animal = new Animal('animal');
animal.speak(); // animal makes a noise.
```
正如你所看到的，两种样式（ES5/6）在幕后产生相同的结果，并且可以以相同的方式使用。

最佳实践：

始终使用class语法，并避免直接操作 prototype。为什么？因为它使代码更简洁和更容易理解。
避免使用空的构造函数。如果没有指定，类有一个默认构造函数。

## 继承

基于前面的Animal类。假设我们想要扩展它并定义Lion类。

在ES5中，它更多地涉及原型继承。
```js
ES5 代码:
var Lion = (function () {
  function MyConstructor(name){
    Animal.call(this, name);
  }
 
  // prototypal inheritance
  MyConstructor.prototype = Object.create(Animal.prototype);
  MyConstructor.prototype.constructor = Animal;
 
  MyConstructor.prototype.speak = function speak() {
    Animal.prototype.speak.call(this);
    console.log(this.name + ' roars ');
  };
  return MyConstructor;
})();
var lion = new Lion('Simba');
lion.speak(); // Simba makes a noise.
// Simba roars.
```
我不详细描述所有细节，但请注意：

* 第3行，我们用参数显式调用Animal构造函数。
* 第7-8行，我们将Lion原型分配给Animal原型。
* 第11行，我们从父类Animal中调用speak方法。
* 在ES6中，我们有2个新的关键字extends和super。

```js
ES6 代码:
class Lion extends Animal {
  speak() {
    super.speak();
    console.log(this.name + ' roars ');
  }
}
const lion = new Lion('Simba');
lion.speak(); // Simba makes a noise.
// Simba roars.
```
看看ES6的代码比ES5看起来清晰了很多，并且他们做的事情完全一样。

最佳实践：

使用extends内置继承方式来实现继承。

## 原生的 Promises

从回调地狱 到 promises
```js
ES5 代码:
function printAfterTimeout(string, timeout, done){
  setTimeout(function(){
    done(string);
  }, timeout);
}
printAfterTimeout('Hello ', 2e3, function(result){
  console.log(result);
  // nested callback
  printAfterTimeout(result + 'Reader', 2e3, function(result){
    console.log(result);
  });
});
```
我们有一个函数接收一个回调，当done时执行。我们必须一个接一个地两度执行它。这就是为什么我们在回调中第二次调用printAfterTimeout的原因。

如果你需要第3或第4次回调，那么你很快就凌乱了。让我们看看我们如何使用promises：
```js
ES6 代码:
function printAfterTimeout(string, timeout){
  return new Promise((resolve, reject) => {
    setTimeout(function(){
      resolve(string);
    }, timeout);
  });
}
printAfterTimeout('Hello ', 2e3).then((result) => {
  console.log(result);
  return printAfterTimeout(result + 'Reader', 2e3);
}).then((result) => {
  console.log(result);
});
```
正如你说看到的，使用 promises，我们可以使用then在一个函数完成后做另一些事情。不再需要嵌套函数。

## 箭头函数

ES6没有删除函数表达式，但它添加了一个新的函数表达式，称为箭头函数。

在ES5中，对于this我们有一些疑问：
```js
ES5 代码:
var _this = this; // 需要保持一个引用
$('.btn').click(function(event){
  _this.sendData(); // 引用函数外层的 this
});
$('.input').on('change',function(event){
  this.sendData(); // 引用函数外层的 this
}.bind(this)); // 绑定函数外层的 this
```
你需要使用一个临时的 this ，以便在函数内部引用，或使用bind。在ES6中，可以使用箭头函数！
```js
ES6 代码:
// this 将引用外部的那个 this
$('.btn').click((event) =>  this.sendData());
// 隐式返回
const ids = [291, 288, 984];
const messages = ids.map(value => `ID is ${value}`);
```
## For…of

从 for 到 forEach 再到 for...of:
```js
ES5 代码:
// for
var array = ['a', 'b', 'c', 'd'];
for (var i = 0; i < array.length; i++) {
  var element = array[i];
  console.log(element);
}
// forEach
array.forEach(function (element) {
  console.log(element);
});
```
ES6 的 for...of 同样允许我们迭代。
```js
ES6 代码:
// for ...of
const array = ['a', 'b', 'c', 'd'];
for (const element of array) {
    console.log(element);
}
```
## 默认参数

从检查变量是否被定义 到 分配一个值给默认参数。你以前做过类似的事情吗？
```js
ES5 代码:
function point(x, y, isFlag){
  x = x || 0;
  y = y || -1;
  isFlag = isFlag || true;
  console.log(x,y, isFlag);
}
point(0, 0) // 0 -1 true 
point(0, 0, false) // 0 -1 true 
point(1) // 1 -1 true
point() // 0 -1 true
```
肯定这些做过吧？这是一个常见的模式来检查是变量是否赋值，否则分配一个默认值。但是，注意有一些问题：
* 第7行，我们传递0, 0，得到0, -1。
* 第8行，我们传递false，但得到true。
如果你将一个布尔值作为默认参数或将值设置为0，它就不正常工作了。你知道为什么吗？？？我将在ES6示例后面告诉你;）

现在，如果你用ES6，可以用更少的代码做的更好！
```js
ES6 代码:
function point(x = 0, y = -1, isFlag = true){
  console.log(x,y, isFlag);
}
point(0, 0) // 0 0 true
point(0, 0, false) // 0 0 false
point(1) // 1 -1 true
point() // 0 -1 true
```
注意第4行和第5行， 我们得到了预期的结果。ES5的示例则没有正常工作。我们必须属性检查  undefined,因为false，null，undefined和0是假（falsy）值。我们需要更加多的代码来修复这个问题：
```js
ES5 代码:
function point(x, y, isFlag){
  x = x || 0;
  y = typeof(y) === 'undefined' ? -1 : y;
  isFlag = typeof(isFlag) === 'undefined' ? true : isFlag;
  console.log(x,y, isFlag);
}
point(0, 0) // 0 0 true
point(0, 0, false) // 0 0 false
point(1) // 1 -1 true
point() // 0 -1 true
```
我们检查 undefined，现在它就能按预期工作了。

## Rest参数（多余参数）

从 arguments 到 rest参数 和 扩展运算符。

在ES5中，获取任意数量的参数是非常麻烦的：
```js
ES5 代码:
function printf(format) {
  var params = [].slice.call(arguments, 1);
  console.log('params: ', params);
  console.log('format: ', format);
}
printf('%s %d %.2f', 'adrian', 321, Math.PI);
```
我们可以使用rest运算符...做同样的事情。
```js
ES6 代码:
function printf(format, ...params) {
  console.log('params: ', params);
  console.log('format: ', format);
}
printf('%s %d %.2f', 'adrian', 321, Math.PI);
```
## 扩展运算符

从apply()到扩展运算符，我们有 ... 拯救：

提醒：我们使用apply() 将数组转换为一个参数列表。例如，Math.max()获取参数列表，但是如果我们有一个数组，我们可以使用apply来使它工作。

![](http://css88.b0.upaiyun.com/css88/2016/10/javascript-math-apply-arrays.png)

正如我们在前面看到的，我们可以使用apply将数组作为参数列表传递：
```js
ES5 代码:
Math.max.apply(Math, [2,100,1,6,43]) // 100
```
在ES6中，你可以使用 扩展运算符。
```js
ES6 代码:
Math.max(...[2,100,1,6,43]) // 100
```
另外，我们可以使用扩展运算符来 concat（合并）数组：
```js
ES5 代码:
var array1 = [2,100,1,6,43];
var array2 = ['a', 'b', 'c', 'd'];
var array3 = [false, true, null, undefined];
console.log(array1.concat(array2, array3));
```
在ES6中，可以使用扩展运算符合并数组：
```js
ES6 代码:
const array1 = [2,100,1,6,43];
const array2 = ['a', 'b', 'c', 'd'];
const array3 = [false, true, null, undefined];
console.log([...array1, ...array2, ...array3]);
```