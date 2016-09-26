---
title: 使用node.js自动更新本地hosts, 实现科学上网.
date: 2016-09-04 14:52:35
tags: [nodejs,hosts,fuck-gfw]
---
现在网上有不少提供google hosts的网址，当我们访问不了google时，就需要复制这个网站提供的hosts到我们本地的hosts，在粘贴前还要在C盘一层一层的找到本地hosts，比较麻烦。
于是我就想能不能通过运行一条命令就能把网站里的hosts自动更新到本地，刚开始想的是用php写的，不过在跟同学聊天的过程中，同学建议使用node来实现这个功能，简单方便，而且我对php的正则表达式也不是很熟，那就用node试试吧。
<!-- more -->

# 1. 安装Node
进入[官网](https://nodejs.org/en/download)，下载我们需要的程序包。下载后，双击进行安装。
![](http://7xoatu.com1.z0.glb.clouddn.com/o_1ajj0h2ii5r4uk81u9p27i1i11a.jpg)
在现在的node版本中，默认是node和npm一起安装的，不用再单独安装npm了。
安装成功后，使用win+r打开cmd命令窗口，然后输入``node -v``查看当前node的版本号
输入``npm -v``查看当前npm的版本号
如果两个都能正确显示出版本号，就说明node和npm已经安装成功了。
使用.msi类型的文件进行能够自动添加node和npm到PATH的环境变量中。

# 2. 下载需要的模块包
npm是一个node的包管理和分发工具。有了npm，可以很快的找到你想要使用的包，进行下载、安装以及管理已经安装的包。
使用npm进行模块的安装非常的方便：``npm install ****``
如果想安装成全局的，所有的项目都能使用，可以添加上-g参数，如：``npm install -g ****``
本项目中主要使用到的模块有：
* request : 远程url请求。
* cheerio : 类似于jQuery，能够像jQuery那样选择元素，获取元素的内容。
* fs : 这是npm里自带的，不用下载安装，主要用于文件的读写操作。

# 3. 编写程序
程序的逻辑很简单：
* 获取远程url的网页内容；
* 解析出网页内容中hosts部分； 
* 读取自己设置的一些hosts；  
* 将自己的hosts和远程获取到的hosts一起写入到C盘的hosts文件中。 
这里使用了async中的waterfall来控制整个代码的流程。

```js
async.waterfall([
    function(callback){
        self.log("正在连接 hosts url....");

        callback(error, data);
    },
    function(body, callback){
        self.log("正在解析数据....");

        callback(null, text);
    },
    function(text, callback){
        self.log('读取本地文件....');
        
        callback(err, data); 
    },
    function(text, callback){
        self.log('正在写入hosts....');
        
        if(err){
            self.log("写入失败....");
        }else{
            self.log("写入成功....");
        }
        calllback(err);
    },
    function(){
        self.log('运行完毕!');
    }
], function(err, data){
    console.log('err: '+err);
    // console.log('data: '+data);
})	
```

async.waterfall提供瀑布式的流控制。每个操作产生的数据可以传递给下一个函数，通过callback这个回调函数。 
async模块保证回调只会被触发一次。它同时还为我们处理了错误，管理并行的任务。 
这里还要说明一下：我这儿有一个单独的文件来放置自己的hosts，比如当前目录中的default.txt文件

# 4. 运行代码
进入到这个项目所在的目录，首先运行``npm install``，安装程序所需要的集成包。安装完成之后，然后运行``index.js:node index.js``，如果正常的话，就会出现下面的提示：
![](http://7xoatu.com1.z0.glb.clouddn.com/o_1ajj1499q125g1lkufv518c31r5ga.png)
程序采用的更新hosts的方式是全覆盖写入，因此我们需要把自己配置的一些hosts写到一个文件里（如default.txt）。当程序更新时，会首先读取default.txt里的hosts配置，然后与远程地址里的google hosts一起写入到本地的hosts文件中。
代码里还有参数的默认配置：
```json
_option : {  
	hostsurl : 'http://www.360kb.com/kb/2_122.html',  // 请求地址
	hostsfile : 'C:/Windows/System32/drivers/etc/hosts',  // 本地hosts地址
	localfile : './default.txt'  // 默认hosts
}
```
你可以直接修改这些变量，或者在调用init()方法时传递你需要的参数，程序自然会覆盖掉默认参数：
```json
wzHosts.init({hostsfile:'/etc/hosts', localfile:'/data/default.txt'}); 
```
这样，本地里的google hosts就更新到了最新！

# 5. 总结与更新地址
通过这次的hosts读写，学习到了不少的node知识，欢迎提出你们的意见和建议！
Google hosts更新网址:
>http://www.360kb.com/kb/2_122.html
>https://laod.cn/black-technology/hosts.html