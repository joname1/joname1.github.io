title: Webpack 入门及实践
date: 2016-10-10 11:23:54 +0800
update: 2016-10-10 12:00:00 +0800
author: me
tags:
    - Webpack
preview: web开发中常用到的静态资源主要有JavaScript、CSS、图片、Jade等文件，webpack中将静态资源文件称之为模块。webpack是一个模块打包工具，其可以兼容多种js书写规范，且可以处理模块间的依赖关系，具有更强大的js模块化的功能。

---
# webpack是什么？

web开发中常用到的静态资源主要有JavaScript、CSS、图片、Jade等文件，webpack中将静态资源文件称之为模块。webpack是一个模块打包工具，其可以兼容多种js书写规范，且可以处理模块间的依赖关系，具有更强大的js模块化的功能。 官方网站中用下图清晰的描述了webpack采用不同的loader加载不同的资源文件，打包生成多个js文件，也可以根据设置生成独立的图片、css文件等。

# why webpack？

在以往的开发过程中，经常会遇到以下三种情况：

* 项目中资源多样性和依赖性 - js、css、png、less、jade等 为了方便开发，我们经常会使用不同的语法来编写文档，用less、sass、jade等会提高开发效率，但同时我们需要借助gulp或grunt来编写任务编译文件或对图片进行压缩等。
* js模块规范复杂化 - AMD、CommonJS、UMD、ES6等 requireJS主要用来处理AMD规范的js文件，若使用CommonJS规范的js库文件，需进行AMD规范的封装，才能正常使用。而browserify主要处理CommonJS规范的文件，其他规范也需要进行转化。近期ES6的兴起，前面两种打包工具已经不能满足我们的需求了。
* 开发与线上文件不一致性（打包压缩造成影响）

webpack可以很好地解决上面的问题，它具有Grunt、Gulp对于静态资源自动化构建的能力，是一个出色的前端自动化构建工具、模块化工具、资源管理工具。

# webpack 特性

webpack具有requireJs和browserify的功能，但仍有很多自己的新特性：

1. 对 CommonJS 、 AMD 、ES6的语法做了兼容
2. 对js、css、图片等资源文件都支持打包
3. 串联式模块加载器以及插件机制，让其具有更好的灵活性和扩展性，例如提供对CoffeeScript、ES6的支持
4. 有独立的配置文件webpack.config.js
5. 可以将代码切割成不同的chunk，实现按需加载，降低了初始化时间
6. 支持 SourceUrls 和 SourceMaps，易于调试
7. 具有强大的Plugin接口，大多是内部插件，使用起来比较灵活
8. webpack 使用异步 IO 并具有多级缓存。这使得 webpack 很快且在增量编译上更加快

# webpack 安装及使用

webpack 可以作为全局的npm模块安装，也可以在当前项目中安装。

```js
npm install -g webpack
```

```js
npm install --save-dev webpack
```

webpack的使用通常有三种方式：

* 命令行使用：webpack <entry.js> <result.js> 其中entry.js是入口文件，result.js是打包后的输出文件
* node.js API使用：

```js
var webpack = require('webpack');
webpack({
//configuration
}, function(err, stats){});
```
默认使用当前目录的webpack.config.js作为配置文件。如果要指定另外的配置文件，可以执行：webpack --config webpack.custom.config.js

# webpack 常用命令

webpack的使用和browserify有些类似，下面列举几个常用命令：

* ``webpack`` 最基本的启动webpack命令
* ``webpack -w`` 提供watch方法，实时进行打包更新
* ``webpack -p`` 对打包后的文件进行压缩
* ``webpack -d`` 提供SourceMaps，方便调试
* ``webpack --colors`` 输出结果带彩色，比如：会用红色显示耗时较长的步骤
* ``webpack --profile`` 输出性能数据，可以看到每一步的耗时
* ``webpack --display-modules`` 默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块
前面的四个命令比较基础，使用频率会比较大，后面的命令主要是用来定位打包时间较长的原因，方便改进配置文件，提高打包效率。

# webpack 配置文件

项目中静态资源文件较多，使用配置文件进行打包会方便很多。最简单的Webpack配置文件webpack.config.js如下所示：
```js
module.exports = {
  entry:[
    './entry.js',
    ...
  ],
  output: {
    path: __dirname + '/output/',
    publicPath: "/output/",
    filename: 'result.js'
  }
};
```

* 其中entry参数定义了打包后的入口文件，数组中的所有文件会打包生成一个filename文件
* output参数定义了输出文件的位置及名字，其中参数path是指文件的绝对路径，publicPath是指访问路径，filename是指输出的文件名。

开发中需要将多个页面的公用模块独立打包，从而可以利用浏览器缓存机制来提高页面加载效率，减少页面初次加载时间，只有当某功能被用到时，才去动态的加载。这就需要使用webpack中的CommonsChunkPlugin插件。具体配置如下：

```js
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
  entry: { a: "./a", b: "./b" },
  output: { filename: "[name].js" },
  plugins: [ new CommonsChunkPlugin("common.js") ]
}
```
在文件中根据下面的方式引用即可。
```html
<script src="common.js"></script>
<script src="a.js"></script>
<script src="b.js"></script>
```
# webpack 模块加载器

在webpack中JavaScript，CSS，LESS，TypeScript，JSX，CoffeeScript，图片等静态文件都是模块，不同模块的加载是通过模块加载器（webpack-loader）来统一管理的。loaders之间是可以串联的，一个加载器的输出可以作为下一个加载器的输入，最终返回到JavaScript上。loader的配置可以写在配置文件中，通过正则表达式的方式对文件进行匹配，具体可参见下面的示例：
```js
module: {
    loaders: [{
        test: /\.less/,
        loader:  'style-loader!css-loader!less-loader'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=10000&name=build/[name].[ext]'
    }]
}
```
loader也支持在js文件中通过require的方式进行加载，只需要在require资源path的前面指定loader，用！来串联不同的loader和资源即可。

```js
require("style!css!less!./mystyles.less");
```

# css文件独立打包

在webpack中编写js文件时，可以通过require的方式引入其他的静态资源，可通过loader对文件自动解析并打包文件。通常会将js文件打包合并，css文件会在页面的header中嵌入style的方式载入页面。但开发过程中我们并不想将样式打在脚本中，最好可以独立生成css文件，以外链的形式加载。这时extract-text-webpack-plugin插件可以帮我们达到想要的效果。需要使用npm的方式加载插件，然后参见下面的配置，就可以将js中的css文件提取，并以指定的文件名来进行加载。

```js
npm install extract-text-webpack-plugin –save-dev
```
```js
plugins: [
    new ExtractTextPlugin('styles.css')
]
```
# 图片打包

webpack中对于图片的处理，可以通过url-loader来实现图片的压缩。
```js
div.img{
    background: url(../image/xxx.jpg)
}

//或者
var img = document.createElement("img");
img.src = require("../image/xxx.jpg");
document.body.appendChild(img);
```
针对上面的两种使用方式，loader可以自动识别并处理。根据loader中的设置，webpack会将小于指点大小的文件转化成 base64 格式的 dataUrl，其他图片会做适当的压缩并存放在指定目录中。
```js
module: {
    {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=10000&name=build/[name].[ext]'
    }]
}
```
对于上面的配置，如果图片资源小于10kb就会转化成 base64 格式的 dataUrl，其他的图片会存放在build/文件夹下。

# webpack-dev-server

webpack除了可以对模块进行打包，还提供了一个开发服务器。它的特点是：

* 基于Node.js Express框架的轻量开发服务器
* 静态资源Web服务器
* 开发中会监听文件的变化在内存中实时打包

webpack-dev-server需要单独安装，命令如下：

```js
npm install -g webpack-dev-server
```

可以使用webpack-dev-server直接启动，也可以增加参数来获取更多的功能，具体配置可以参见[官方文档](http://webpack.github.io/docs/webpack-dev-server.html)。默认启动端口8080，通过localhost:8080/webpack-dev-server/可以访问页面，文件修改后保存时会在页面头部看到sever的状态变化，并且会进行热替换，实现页面的自动刷新。

# 双服务器模式

项目开发中，仅有一台静态服务器是不能满足需求的，我们需要另启一台web服务器，且将静态服务器集成到web服务器中，就可以使用webpack的打包和加载功能。我们只需要修改一下配置文件就可以实现服务器的集成。
```js
 entry: [
    './src/page/main.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://127.0.0.1:8080'
  ]
  output: {
    path: __dirname,
    filename: '[name].js',
    publicPath: "http://127.0.0.1:8080/assets/"
  }
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
```
如果在开发中启动两个服务器并不是一个很好地选择，webpack提供了一个中间件webpack-dev-middleware，但其只能在生产环境中使用，可以实现在内存中实时打包生成虚拟文件，供浏览器访问以及调试。使用方式如下：
```js
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");

var compiler = webpack({
    // configuration
    output: { path: '/' }
});

app.use(webpackDevMiddleware(compiler, {
    // options
}));
```
# PS

通过上面的介绍，基本涵盖了webpack的各个特性及简单的使用方法。最近出了个``hjs-webpack``，可以简化webpack中复杂的配置项，只需要安装开发中所需的loader，无需再module中配置，即可正确使用。有兴趣的同学可以尝试一下。