title: webpack+gulp 静态文件打包并自动上传到七牛云
date: 2016-10-21 11:23:54 +0800
update: 2016-10-21 12:00:00 +0800
author: me
tags:
    - Webpack
    - Gulp
preview: 经过几天的瞎折腾实现了webpack可以与gulp完美结合的进行打包静态文件，并将静态文件上传到七牛云存储，当然也可以传到你想传的云存储了，这里只分享一个七牛的云存储方案。

---
经过几天的瞎折腾实现了webpack可以与gulp完美结合的进行打包静态文件，并将静态文件上传到七牛云存储，当然也可以传到你想传的云存储了，这里只分享一个七牛的云存储方案。

关于如何使用webpack打包静态代码，这个可以参考我之前的一些文章和方案。

这里只分享一下gulp这边的操作，然后给一个例子实现如何一条命令打包静态文件并更新CDN文件的方法。

```js
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const shrink = require('gulp-cssshrink');
const webpack = require('gulp-webpack');
const qn = require('gulp-qn');

const rev = require('gulp-rev-qn');
const revCollector = require('gulp-rev-collector');
const runSequence = require('run-sequence');
const config = require('./webpack.config');
const qiniu_options = {
  accessKey: 'xxxxxxxxxx',
  secretKey: 'xxxxxxxxxx',
  bucket: 'xxxxxxxxxxxxx',
  domain: 'http://xxxxx.com'
};
gulp.task('publish-js', function () {
  return gulp.src(['./build/js/*.js'])
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./build/js'))
    .pipe(qn({
      qiniu: qiniu_options,
      prefix: 'js'
    }))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./build/rev/js'));
});
gulp.task('publish-font', function () {
  return gulp.src(['./build/js/*.woff2','./build/js/*.ttf','./build/js/*.eot','./build/js/*.woff'])
    .pipe(qn({
      qiniu: qiniu_options,
      prefix: 'js'
    }));
});
gulp.task('publish-css', function () {
  return gulp.src(['./build/js/*.css'])
    .pipe(rev())
    .pipe(gulp.dest('./build/js'))
    .pipe(qn({
      qiniu: qiniu_options,
      prefix: 'css'
    }))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./build/rev/css'));
});
gulp.task('publish-html', function () {
  return gulp.src(['./build/rev/**/*.json', './build/views/*.html'])
    .pipe(revCollector({
      dirReplacements: {
        '/js/': ''
      }
    }))
    .pipe(gulp.dest('./build/views'));
});
gulp.task('default',function(callback){
  runSequence(
    ['publish-css','publish-js','publish-font'],
    'publish-html',
    callback);
});
```
## PS:
publish-js：将js文件进行版本更新并上传到七牛。

publish-css：将css文件进行版本更新并上传到七牛。

publish-font：将字体文件上传到七牛。

publish-html：将html文件中对应的js路径进行替换。