title: 使用 gulp 编译 LESS
date: 2016-09-13 11:23:54 +0800
update: 2016-09-13 12:00:00 +0800
author: me
tags:
    - Gulp
preview: Less 是一门 CSS 预处理语言，它扩充了 CSS 语言，增加了诸如变量、混合（mixin）、函数等功能，让 CSS 更易维护。

---
> Less 是一门 CSS 预处理语言，它扩充了 CSS 语言，增加了诸如变量、混合（mixin）、函数等功能，让 CSS 更易维护。

安装
---

```
npm install gulp-less
```

基本用法
-------

```js
// 获取 gulp
var gulp = require('gulp')
// 获取 gulp-less 模块
var less = require('gulp-less')

// 编译less
// 在命令行输入 gulp less 启动此任务
gulp.task('less', function () {
    // 1. 找到 less 文件
    gulp.src('less/**.less')
    // 2. 编译为css
        .pipe(less())
    // 3. 另存文件
        .pipe(gulp.dest('dist/css'))
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 less 任务
    gulp.watch('less/**.less', ['less'])
})

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 less 任务和 auto 任务
gulp.task('default', ['less', 'auto'])
```

你可以访问 [gulp-less](https://github.com/plus3network/gulp-less) 以查看更多用法。

LESS 代码和编译后的CSS代码
----------

less/a.less

```css
.less{
  a{
        color:pink;
    }
}
```
less/import.less


```css
@import "a.less";
.import{
  a{
    color:red;
    }
}
```
less/a.css

```css
.less a {
  color: pink;
}
```
less/import.css

```css
.less a {
  color: pink;
}
.import a{
  color: red;
}
```
