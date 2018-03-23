title: 新手必须掌握5个LESS CSS
date: 2015-10-01 16:23:54 +0800
update: 2015-10-01 17:00:00 +0800
author: me
tags:
    - Less
    - CSS
preview: LESS, Sass 和其他 CSS 预处理器是一种超棒的方法用来扩展 CSS功能，使之更适合程序员。你可以使用变量、函数、混合、继承等多种编程常用方法来编写 CSS，以更少的代码完成更多的样式。学习这些工具最好的方法是通过各种实例快速入门，今天我们向你介绍 10 个非常有用的使用 Less CSS 的实例。

---

LESS, Sass 和其他 CSS 预处理器是一种超棒的方法用来扩展 CSS功能，使之更适合程序员。
你可以使用变量、函数、混合、继承等多种编程常用方法来编写 CSS，以更少的代码完成更多的样式。
学习这些工具最好的方法是通过各种实例快速入门，今天我们向你介绍 10 个非常有用的使用 Less CSS 的实例。

# 1、变量
变量允许我们单独定义一系列通用的样式，然后在需要的时候去调用。所以在做全局样式调整的时候我们可能只需要修改几行代码就可以了。
```css
  // LESS

@color: #4D926F;

#header {
  color: @color;
}
h2 {
  color: @color;
}
```

/* 生成的 CSS */
```css
#header {
  color: #4D926F;
}
h2 {
  color: #4D926F;
}
```

# 2、混合
混合可以将一个定义好的class A轻松的引入到另一个class B中，从而简单实现class B继承class A中的所有属性。我们还可以带参数地调用，就像使用函数一样。
```css
// LESS

.rounded-corners (@radius: 5px) {
  border-radius: @radius;
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
}

#header {
  .rounded-corners;
}
#footer {
  .rounded-corners(10px);
}
```
/* 生成的 CSS */
```css
#header {
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
}
#footer {
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
}
```

# 3、嵌套规则
我们可以在一个选择器中嵌套另一个选择器来实现继承，这样很大程度减少了代码量，并且代码看起来更加的清晰。
```css
// LESS

#header {
  h1 {
    font-size: 26px;
    font-weight: bold;
  }
  p { font-size: 12px;
    a { text-decoration: none;
      &:hover { border-width: 1px }
    }
  }
}
```
/* 生成的 CSS */
```css
#header h1 {
  font-size: 26px;
  font-weight: bold;
}
#header p {
  font-size: 12px;
}
#header p a {
  text-decoration: none;
}
#header p a:hover {
  border-width: 1px;
}
```

# 4、函数 & 运算
运算提供了加，减，乘，除操作；我们可以做属性值和颜色的运算，这样就可以实现属性值之间的复杂关系。LESS中的函数一一映射了JavaScript代码，如果你愿意的话可以操作属性值。
```css
// LESS

@the-border: 1px;
@base-color: #111;
@red:        #842210;

#header {
  color: @base-color * 3;
  border-left: @the-border;
  border-right: @the-border * 2;
}
#footer { 
  color: @base-color + #003300;
  border-color: desaturate(@red, 10%);
}
```
/* 生成的 CSS */
```css
#header {
  color: #333;
  border-left: 1px;
  border-right: 2px;
}
#footer { 
  color: #114411;
  border-color: #7d2717;
}
```

# 5、圆角
CSS3 一个非常基本的新属性可以快速的生产圆角效果，如上图所示。要使用 CSS3 的圆角效果我们必须针对不同的浏览器定义各自的前缀，而如果使用了 LESS 就可以不用那么麻烦。
* 简单的圆角半径
我的第一个 LESS 代码是我最简单的 LESS 代码之一，我需要设置圆角的半径，而且我希望使用一个变量来调整这个半径大小。
下面代码使用 mixin 技术，通过定义 .border-radius 并接收一个 radius 参数，该参数默认值是 5px，你可以在多个地方重复使用该 mixin 方法：
```css
/* Mixin */
.border-radius (@radius: 5px) {
    -webkit-border-radius: @radius;
    -moz-border-radius: @radius;
    border-radius: @radius;
}
 
/* Implementation */
#somediv {
    .border-radius(20px);
}
```
将这个 less 编译成 css 后的结果是：
```css
/* Compiled CSS */
#somediv {
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
}
```
* 四角的半径定制
如果你希望用户可自由定制四个角的半径，那么我们需要对上面代码做下改进。
使用4个变量分别代表四个边角的半径大小：

```css
/* Mixin */
.border-radius-custom (@topleft: 5px, @topright: 5px, @bottomleft: 5px, @bottomright: 5px) {
    -webkit-border-radius: @topleft @topright @bottomright @bottomleft;
    -moz-border-radius: @topleft @topright @bottomright @bottomleft;
    border-radius: @topleft @topright @bottomright @bottomleft;
}
 
/* Implementation */
#somediv {
    .border-radius-custom(20px, 20px, 0px, 0px);
}
```
编译后的 CSS
```css
/* Compiled CSS */
#somediv {
  -webkit-border-radius: 20px 20px 0px 0px;
  -moz-border-radius: 20px 20px 0px 0px;
  border-radius: 20px 20px 0px 0px;
}
```