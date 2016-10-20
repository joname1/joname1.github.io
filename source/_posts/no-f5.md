---
title: BrowserSync自动刷新,释放你的F5.
date: 2016-10-4 12:03:14
tags: [browser-sync,nodejs,node.js]
---
想象一下这个场景：你开着两个显示器，一边是写代码，另一边是浏览器里的你正在开发的Web。此时桌上还放着你的手机，手机里也是这个开发中的应用。然后，你新写了一小段代码，按下了<code>Ctrl+S</code>保存。紧接着，你的手机和另一个显示器里的应用，就变成了更新后的效果。你可以马上检查效果是否和你预想的一致，甚至都不需要动一下鼠标。
<!-- more -->
想起来还不错？嗯，这只是简单地省略掉那个开发过程中会按好多遍的F5刷新。

LiveReload有所不足的地方是，需要搭配浏览器插件。但是，插件是取决于浏览器的，Chrome和Firefox都有可用插件，但IE和手机上的浏览器，就不能这样了，这时候只能手工向页面里添加一段<code>&lt;script&gt;</code>代码，而且还要记得结束后再手工移除。

BrowserSync的用法则不需要浏览器插件，也不用手工添加代码。一句控制台的命令之后，无论是在手机里还是电脑，无论用多少个浏览器，都可以拥有自动刷新的功能。

![](http://i1.piimg.com/567571/c60e6937130d255d.jpg)

# BrowserSync安装和使用
* 1.下载并安装Node.js：

https://nodejs.org/en/download

* 2.通过npm安装BrowserSync：

`npm install -g browser-sync`

* 3.安装后，就可以开始使用了。打开控制台进入项目所在的目录，然后输入命令(此命令用于纯静态站点)：
--files 路径是相对于运行该命令的项目（目录）

``browser-sync start --server --files "*.css, *.html"``

后面的*.css, *.html，是指监听目录中的后缀名为.css和.html的文件。

## 如果你的文件层级比较深，您可以考虑使用 **（任意目录匹配），来监听目录下的任意文件。
``browser-sync start --server --files "**"``

## 如果是动态站点，则使用代理模式。例如PHP站点，已经建立了一个本地服务器如``http://localhost:8080``

此时会是这样的命令：

``browser-sync start --proxy "localhost:8080" --files "*.css"``

BrowserSync会提供一个新地址（如未被占用的话，``http://localhost:3000``）用于访问。

好了，为什么BrowserSync不需要浏览器插件？因为它使用了服务器的形式（直接或代理）来处理项目文件。默认情况下，访问它的服务器上的网页，可以看到这样的提示签：

![](http://i1.piimg.com/567571/48b052b246d65304.png)

这说明当前浏览的网页已连接到BrowserSync。查看一下源码，会发现它们都被添加了与BrowserSync有关的一段<code>&lt;script&gt;</code>代码，就像LiveReload浏览器插件做的那样。这些代码会在浏览器和BrowserSync的服务器之间建立web socket连接，一旦有监听的文件发生变化，BrowserSync会通知浏览器。
如果监听的文件是CSS，BrowserSync不会刷新整页，而是直接重新请求这个css文件，并更新到当前页中，如图：

![](http://i1.piimg.com/567571/a193de06ae37289b.gif)