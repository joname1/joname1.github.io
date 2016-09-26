---
title: Surge搭配Shadowsocks科学上网教程
date: 2016-09-02 15:14:59
tags: [surge,ss,Shadowsocks,fuck-gfw]
---

## 1、准备工作
* 1、首先你得有一台iPhone, 并且系统一定要在`iOS9`以上。
* 2、然后你要安装有`Surge`这款App。
- ①.去AppStore购买: 328元。
- ②.用第三方助手下载: 0元
* 3、然后你还得有一个Shadowsocks帐号，可以自己在服务器上搭建，也可以购买，我这里不提供、也不出售。
* 4、本教程适用于`1.20 Build 511及以上版本`，低版请尽快升级。
<!-- more -->

## 2、添加Surge规则文件
![](http://7xoatu.com1.z0.glb.clouddn.com/o_1ag5cqtsg1lg3n95j2lj1j1865a.jpg)
备用规则文件地址：``http://joe-10005639.file.myqcloud.com/fuck_gfw.conf``
![](http://7xoatu.com1.z0.glb.clouddn.com/o_1ag8505tj1bojblffp91bj7bvma.jpg)

## 3、配置Shadowsocks帐号
![](http://7xoatu.com1.z0.glb.clouddn.com/o_1ag5cv5pqobn7s9g191ongejra.jpg)
![](http://7xoatu.com1.z0.glb.clouddn.com/o_1ahl6v9he127v1dp1m8222811n9a.jpg)

## 4、启动Surge
#### 第一次运行，会出现下面的提示:
![](http://images.weiphone.net/data/attachment/forum/201511/22/114258hjbbk66gfzbbabdb.jpg)
![](http://images.weiphone.net/data/attachment/forum/201511/22/114300r1cmzn22vruscavg.jpg)
![](http://images.weiphone.net/data/attachment/forum/201511/22/114302kpvpumupvpkzmkvr.jpg)
![](http://images.weiphone.net/data/attachment/forum/201511/22/114300cpeeorhjkoliovss.jpg)
![](http://images.weiphone.net/data/attachment/forum/201511/22/114302o6bw6vbsyio336vi.jpg)
#### 点击`Start`之后，出现`VPN`标志后表示成功。

## 5、常见问题
Q：主要作用？
`A：科学上网、加速苹果商城，屏蔽优酷、土豆、乐视等广告。`
Q：速度会慢吗？
`A：不会，和你平时用Shadowsocks完全一样。`
Q：能添加多条线路吗？
`A：你可以自行修改[Proxy]和[Proxy Group]。`
Q：会耗电吗？
`A：自己使用过程中，没有任何耗电的感觉，也不会发热。`
nQ：使用微信什么的，要断开吗？
`A：完全不需要，因为微信、QQ什么的统统都不走代理。`
Q：锁屏会断开吗？
`A：不会。`
Q：代理了所有的网络，那么用这个软件安全吗？
`A：只能表示本人倾向于信任它。Surge本身就是一款网络调试工具，高级一点的玩法可以通过Surge来分析其他APP的网络活动。`
Q：怎么样快速开启和停止？
`A：Surge提供了通知中心Widget，在Widget里面调出来，很方便的进行开启和停止。`
Q：上面显示VPN图标了，怎么还是打开不了谷歌？
`A：显示VPN图标，只能说明Surge接管了你的网络，但是不代表你的SS账号和服务器是正常的，建议检查SS的设置。`