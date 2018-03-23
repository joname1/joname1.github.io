title: 使用gulp自动合成雪碧图
date: 2016-09-12 11:23:54 +0800
update: 2016-09-12 12:00:00 +0800
author: me
tags:
    - Gulp
preview: 相信做前端的同学都做过这样的事情，为优化图片，减少请求会把拿到切好的图标图片，通过ps（或者其他工具）把图片合并到一张图里面，再通过css定位把对于的样式写出来引用的html里面。

---

相信做前端的同学都做过这样的事情，为优化图片，减少请求会把拿到切好的图标图片，通过ps（或者其他工具）把图片合并到一张图里面，再通过css定位把对于的样式写出来引用的html里面。对于一些图片较多的项目，这个过程可能要花费我们一天的时间，来实现这步。今天我给大家带来一个工具，将这一步缩短到几秒钟就能完成，究竟是什么工具这么神奇呢，他就是gulp的一个插件gulp.spritesmith。下面一张图来说明他能做什么。

![](http://p1.bpimg.com/567571/e55bcb8c0182dab2.png)
看到这个图片介绍，相信大家已经对gulp.spritesmith能做到什么一目了然了，其他的不多说，下面说直接开撸：

## 安装gulp.spritesmith
```js
npm install gulp.spritesmith --save-dev
```

## 编写Gulpfile.js
```js
/引入gulp
var gulp=require("gulp"),
    spritesmith=require('gulp.spritesmith');

gulp.task('default', function () {
    return gulp.src('images/*.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'sprite.png',//保存合并后图片的地址
            cssName: 'css/sprite.css',//保存合并后对于css样式的地址
            padding:5,//合并时两个图片的间距
            algorithm: 'binary-tree',//注释1
            cssTemplate:"css/handlebarsStr.css"//注释2
        }))
        .pipe(gulp.dest('dist/'));
});
```
## 注释一：

Algorithm 有四个可选值分别为top-down、left-right、diagonal、alt-diagonal、binary-tree

对应如下：
![](http://p1.bpimg.com/567571/3e5e6867f51ea2a3.png)


## 注释二：

cssTemplate 是生成css的模板文件可以是字符串也可以是函数。是字符串是对于相对于的模板地址 对于模板文件样式格式是：
```css
{{#sprites}}
.icon-{{name}}{
    background-image: url("{{escaped_image}}");
    background-position: {{px.offset_x}} {{px.offset_y}};
    width: {{px.width}};
    height: {{px.height}};
}
{{/sprites}}
```

如果是函数的话，这可以这样写：
```js
//引入gulp
var gulp=require("gulp"),
    spritesmith=require('gulp.spritesmith');

gulp.task('default', function () {

    return gulp.src('images/*.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'sprite.png',//保存合并后图片的地址
            cssName: 'css/sprite.css',//保存合并后对于css样式的地址
            padding:5,//合并时两个图片的间距
            algorithm: 'binary-tree',//注释1
            cssTemplate: function (data) {
                var arr=[];
                data.sprites.forEach(function (sprite) {
                    arr.push(".icon-"+sprite.name+
                    "{" +
                    "background-image: url('"+sprite.escaped_image+"');"+
                    "background-position: "+sprite.px.offset_x+"px "+sprite.px.offset_y+"px;"+
                    "width:"+sprite.px.width+";"+
                    "height:"+sprite.px.height+";"+
                    "}\n");
                });
                return arr.join("");
            }

        }))
        .pipe(gulp.dest('dist/'));
});
```
以上就是实现将css代码中的切片图片合并成雪碧图的实现，有问题的大家可以留言