---
title: Bootstrap详解：栅格系统
date: 2016-09-03 16:36:29
tags: [Bootstrap,grid]
---
Bootstrap3使用了四种栅格选项来形成栅格系统，这四种选项在官网上的介绍很多人不理解，这里跟大家详解一下四种栅格选项之间的区别，其实区别只有一条就是适合不同尺寸的屏幕设备。我们看class前缀这一项，我们姑且以前缀命名这四种栅格选项，他们分别是col-xs ,col-sm,col-md,col-lg，我们懂英文的就知道，lg是large的缩写，md是mid的缩写，sm是small的缩写，xs是extra small的缩写。这样命名就体现了这几种class适应的屏幕宽度不同。下面我们分别介绍这几种class的特点。 
<!-- more -->
## 1、col-xs类
用法是<code>&lt;div class="col-xs-*"&gt;</code>。它星号代表1~12的数字。我们知道栅格系统总共有12列，我们在这里使用数字几就代表着该div占用几列的宽度。假如我们在给超级小屏幕开发界面，那么我们使用该类，该类没有任何行为，不管屏幕小到多少，都不会改变div的布局。

## 2、col-sm类
用法是<code>&lt;div class="col-sm-*"&gt;</code>。星号的意义同上，但是该类适合屏幕宽度为`750px`的设备，如果在屏幕宽度小于750px的设别上，该div就会水平堆叠。
这是在`大于750px`屏幕上的样式：
![](http://7xoatu.com1.z0.glb.clouddn.com/o_1ahgo0fcs11eg114i150n8mtgdga.jpg)
这是在`小于750px`屏幕上的样式：
![](http://7xoatu.com1.z0.glb.clouddn.com/o_1ahgnv4oa1o2ni62183v8l61npea.jpg)


## 3、col-md类
用法是<code>&lt;div class="col-md-*"&gt;</code>。该类适合`970px`以上屏幕。通上面讲的道理一样，假如使用屏幕尺寸小于`970px`的设备查看网页，div就会垂直堆叠。
这是在`大于970px`屏幕上的样式：
![](http://7xoatu.com1.z0.glb.clouddn.com/o_1ahgo0fcs11eg114i150n8mtgdga.jpg)
这是在`小于970px`屏幕上的样式：
![](http://7xoatu.com1.z0.glb.clouddn.com/o_1ahgnv4oa1o2ni62183v8l61npea.jpg)


## 4、col-lg类
用法是<code>&lt;div class="col-lg-*"&gt;</code>。该类适合`1170px`以上屏幕。通上面讲的道理一样，假如使用屏幕尺寸小于`1170px`的设备查看网页，div就会垂直堆叠。
这是在`大于1170px`屏幕上的样式：
![](http://7xoatu.com1.z0.glb.clouddn.com/o_1ahgo0fcs11eg114i150n8mtgdga.jpg)
这是在`小于1170px`屏幕上的样式：
![](http://7xoatu.com1.z0.glb.clouddn.com/o_1ahgnv4oa1o2ni62183v8l61npea.jpg)

如何组合使用这几个类?
我们使用<code>&lt;div class="col-sm-10 col-md-8"&gt;</code>这样的方式来表示：在中等屏幕设备上该div占用8列的宽度；在小屏幕上该div占用10列的宽度。