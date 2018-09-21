title: 微信小程序上拉加载更多的思(坑)路
date: 2017-11-19 18:23:54 +0800
update: 2017-11-19 21:00:00 +0800
author: me
tags:
    - Weapp
    - ES6
    - Vueact
preview: 微信小程序开发中遇到的坑, 总有些坑你得一个一个的跳啊,/(ㄒoㄒ)/~~当用户打开一个页面时，假设后台数据量庞大时，一次性地返回所有数据给客户端，页面的打开速度就会有所下降，而且用户只看上面的内容而不需要看后面的内容时，也浪费用户流量，基于优化的角度来考虑，后台不要一次性返回所有数据，当用户有需要再往下翻的时候，再加载更加数据出来。

---
> 首先说一下我遇到的需求。

> 有一个商品列表页，当列表滚动到底部时，继续往上拉，加载更多商品，里面的数据都是后端返回的，接口情况大致如下：

> www.xxx.com/?``limit``=xxx&``offset``=xxx

> ``limit``是控制每次上拉刷新的数量，``offset``是控制从当前商品开始往下加载。

# 实现原理
当第一次访问接口时，传递2个必备参数（即limit和offset参数），后台返回数据过来，在请求成功的回调函数中，取出数据，渲染到视图层，并把Toast在列表显示出来；当判断返回的数据长度为0时，则没有数据可取，并把“没有更多了”显示出来。
当用户已经滚动到列表底部（这里使用到小程序提供的onReachBottom事件），当每次触发onReachBottom事件，offset就会增加，再把2个必备参数（第2次加载，需要返回数据的个数）给后台，后台把其余的数据返回给前台，前台在原来数据的基础上往下增加新的商品数据。

```js
  Page({
  	data: {
  		origin_limit: 6,   //控制每次加载的数量
  		origin_offset: 0, //先初始化商品起始点
  		proList: [] //放置返回数据的数组  
  	｝
  })
```

```js 
//下拉加载更多
  onReachBottom(){
    let that = this;
    let prolistAdd = that.data.proList;

    wx.showLoading({         //滚动到底部，弹出Loading。
      title: '拼命加载中..',
      duration: 5000
    })

    wx.request({
      url: 'www.xxx.com',
      data: {
        limit: that.data.orgin_limit,
        offset: that.data.orgin_offset
      },
      success: function (res) {
        wx.hideLoading();  //当请求成功时，隐藏Loading。
        that.setData({
          proList: prolistAdd.concat(res.data.objects), //在原来数据的基础上，增加新加载的商品数据并渲染到视图层。
          orgin_offset: that.data.orgin_offset + 6  //当每次触发上拉事件，offset就会在原数值上增加6。
        })
        if (res.data.objects.length == 0) {  //当判断返回的数据长度为0，则没有数据可取，并把“没有更多了”显示出来。
            wx.showToast({
              title: '没有更多了',
              icon: 'none',
              duration: 3000
            })
        }
      }
    })
  },
```

```js
//把下拉加载更多放到onLoad里面即可
  onLoad: function () {
    this.onReachBottom();
  },
```