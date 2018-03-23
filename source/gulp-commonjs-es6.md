title: 使用 gulp 搭建CommonJs & ES6 模块化环境
date: 2016-09-05 16:55:05 +0800
update: 2016-09-05 17:00:00 +0800
author: me
tags:
    - Gulp
    - ES6
preview: CommonJS 规范是为了解决 JavaScript的作用域问题而定义的模块形式，可以使每个模块在它自身的命名空间中执行。该规范的主要内容是，模块必须通过module.exports 导出对外的变量或接口，通过 require()来导入其他模块的输出到当前模块作用域中。

---
# 1. Browserify简介
> "Browserify lets you require('modules') in the browser by bundling up all of your dependencies." - Browserify.org

上面的描述是摘自 browserify 官网；用通俗的话讲就是：browserify 是一个浏览器端代码模块化工具，可以处理模块之间的依赖关系，让服务器端的 CommonJS 格式的模块可以运行在浏览器端。


![](https://cloud.githubusercontent.com/assets/3995814/11768221/b22531fe-a200-11e5-8e98-8e36d8471bf8.png)

browserify的原理：

* 处理代码依赖，将模块打包到一起

打包为单个文件存在的问题：

* 暂时用不到的代码也会被打包，体积大，首次加载速度慢

* 只要一个模块更新，整个文件缓存失效

注：暂时用不到的代码指不同的页面有不同的 JS 文件，不需要在当前页面引用其他页面的代码即为暂时用不到的代码

Browserify的解决方案：

* entry point：入口点技术，每个入口点打包一个文件，两个入口点的相同依赖模块单独打包为common.js

### 安装与配置
安装 browserify

``npm install -g browserify``

引入 browserify

``import  browserify from 'browserify'``

基本配置
```js
glup.taks('browserify', function() {
  browserify({
     //先处理依赖，入口文件
     entries: ['./foo.js','./main.js'],
     //进行转化
     transform: []
  })
   .bundle() // 多个文件打包成一个文件
   .pipe(source()) // browserify的输出不能直接用做gulp输入，所以需要source进行处理 
   .pipe(gulp.dest('./'));  
})
```
### 安装一些依赖插件
```bash
npm install --save-dev vinyl-source-stream vinyl-buffer gulp-sourcemaps
```

``vinyl-source-stream``: browserify的输出不能直接用着gulp的输入，vinly-source-stream 主要是做一个转化

``vinyl-buffer``: 用于将vinyl流转化为buffered vinyl文件（gulp-sourcemaps及大部分Gulp插件都需要这种格式）

``gulp-sourcemaps``: Source map就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置，便于调试

``Watchify``: 加速 browserify 编译

# 2. 编写 CommonJS 模块

### 目录结构
```
|-- dist/
   |-----bundle.js
|-- src/
   |-----foo.js
   |-----main.js
|--gulpfile.babel.js
|--package.json
```

### 新建两个模块文件 foo.js, main.js
``$ touch foo.js main.js``

### 让我使用 CommonJs 规范来写一些代码
> CommonJS 规范是为了解决 JavaScript的作用域问题而定义的模块形式，可以使每个模块在它自身的命名空间中执行。
> 该规范的主要内容是，模块必须通过module.exports 导出对外的变量或接口，通过 require() 来导入其他模块的输出到当前模块作用域中。

```js
// foo.js
// 定义foo.js模块，通过 module.exports 导出对外的变量或接口
let variable = 8;
let sum = (a, b = 6) => (a + b);
let square = (b) => {
    return b * b;
};
module.exports.variable = variable;
module.exports.sum = sum;
module.exports.square = square;

// mian.js
// 通过 require() 来导入 foo.js 模块
var bar = require('./foo')
console.log(bar);  // Object
console.log(bar.variable); // 8
console.log(bar.sum(1)); // 7
console.log(bar.square(5)); // 25
```
> 上面我们使用 ES6 的语法写了两个模块，分别是 foo.js 和 main.js; 在 foo.js 中通过 module.exports 导出对外的变量或接口;在 main.js 中通过 require() 来导入 foo.js 模块，那我们就可以在 mian.js 模块中使用 foo.js 中的变量和接口了。这就是一个最基本的 CommonJs 示例了

### 配置 browserify
通过第一小节的学习，我们知道要在浏览器中运行 CommonJs 风格的模块代码，就需要借助 browserify 来作为转换工具，下面我们在 gulp.babel.js 中来配置 browserify：
```js
// set browserify task
gulp.task('browserify',()=> {
    browserify({
        entries: ['src/js/main.js','src/js/foo.js'],
        debug: true, // 告知Browserify在运行同时生成内联sourcemap用于调试
    })
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer()) // 缓存文件内容
        .pipe(sourcemaps.init({loadMaps: true})) // 从 browserify 文件载入 map
        .pipe(sourcemaps.write('.')) // 写入 .map 文件
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'browserify task complete' }));
})
```

运行
``gulp-browserify``

![](https://cloud.githubusercontent.com/assets/3995814/11768266/592159dc-a202-11e5-8be3-2d4ddaefe5c3.png)

### 打开浏览器，查看运行结果(见上面main.js文件的注释)

# 编写 ES6 Module 模块

上面的代码主要是 CommonJs 模块化的写法，我们再来看看最近火热的 ES6 提供的 Module；让我们使用 ES6 Module 来改写上面的代码：
```js
// foo.js
// 定义foo.js模块，通过 exports 导出对外的变量或接口
let variable = 8;
let sum = (a, b = 6) => (a + b);
let square = (b) => {
    return b * b;
};
export { variable, sum, square };

// main.js
// 测试一：
// 通过 import 来导入 foo.js 模块
import {variable, sum, square} from './foo';
console.log(variable); // 8
console.log(sum(1)); // 7
console.log(square(5)); // 25

// 测试二：
// 直接引用整个 foo 模块
import bar from './foo';
console.log(bar); // 输出值是undefined，后面做解释

// 测试三：
// 通过 ES6 的语法加载整个 foo模块
import * as bar from './foo'
console.log(bar); // Object
```

## 总结 CommonJs 和 ES6 Module

### CommonJs
* 根据 CommonJS 规范，一个单独的文件就是一个模块。每一个模块都是一个单独的作用域，也就是说，在一个文件定义的变量（包括函数和类），都是私有的，对其他文件是不可见的
* 通过 module.exports 对象，定义对外接口，其他文件加载该模块，实际上就是读取 module.exports 变量
* 通过 require 命令加载模块文件，然后返回该模块的exports对象
### ES6 Module
* 通过 export 命令用于规定模块的对外接口
* 通过 import 命令用于加载其他模块提供的功能
### ES6 Module 与 CommonJs 的区别
* 在ES6中使用 import 取代 require
* 在ES6中使用 export 取代 module.exports
* ES6 在编译时就能确定模块的依赖关系，以及输入和输出的变量，而 CommonJs 只能在运行时确定模块的依赖关系以及输入和输出的变量。
- 运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”
- 编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，输入时采用静态命令的形式。即在输入时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”
注：上面提到 ES6 加载模块时是采用指定加载某个输出值的形式，如果你要想加载整个模块，你可以这么做：
``import * as customName from './moduleFileName';``