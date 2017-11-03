---
title: Shadowrocket科学上网使用教程
date: 2016-09-02 14:00:43
tags: [fuck-gfw,ss,Shadowsocks]
---
它与Surge的区别不在于代理形式，而是操作界面及自定义部分，配置文件适配Surge的可以快速扩大使用人群及降低使用成本，而且可以对Proxy和DNS部分做单独区别，并且可以强制本机的DNS，我们知道在iOS使用移动网络下是无法自定义DNS的，在运营商DNS已经干扰得不成样的情况下，如果借助外部DNS还是会对网络体验有很大提升。
其次，我们可以指定DNS做转发，有条件的人可以自己做个专属的DNS转发服务器，扶墙最简单的方式莫过于此，从根本省却了SS这么复杂的方式。
最后是价格低，每个人都能买到，这就是足够的理由了，虽然还有部分BUG，相信作者也会尽快修复的，多给人鼓励包容，让这类工具多出现总是好的。

<!-- more -->
## 1、准备工作
* 1、首先你得有一台iPhone, 并且系统一定要在iOS9以上。
* 2、然后你要安装有 Shadowrocket 这款APP。
 - ①.去AppStore购买: 6元
 - ②.用第三方助手下载: 0元
* 3、然后你还得有一个SS帐号，可以自己在服务器上搭建，也可以购买，我这里不提供、也不出售。

## 2、添加规则文件
### 方法1：
* 进入``Settings``=>``Config``=>``右上角+``，
* 在地址栏输入``http://joe-10005639.file.myqcloud.com/fuck_gfw_sr.conf``
* 然后点击``Local files``，选择``Use Config``，也就是选定配置文件。

### 方法2：
* 进入``Settings``=>``Config``=>``Scan QR code``，扫描以下二维码：

![](http://i1.piimg.com/567571/ba5763a9ced7428f.png)

* 然后点击``Remote files``，选择``Use Config``，也就是选定配置文件。

## 3、填写SS信息
* 回到主界面，从``Choose A Configuration``里面配置SS信息，如图：

![](http://7xoatu.com1.z0.glb.clouddn.com/o_1ahl64sutk5j1tpk1dda5068fea.png)

## 4、启动软件
* 点击连接，出现``VPN``标志表示工作正常。

![](http://7xoatu.com1.z0.glb.clouddn.com/o_1ahl67481r3c1ch32jo1dtb1mga.png)