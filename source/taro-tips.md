title: 微信小程序商品详情页的底部弹出框
date: 2018-06-21 11:23:54 +0800
update: 2018-06-21 14:00:00 +0800
author: me
tags:
    - Weapp
preview: 电商项目中商品详情页，加入购物车或者下单时可以选择商品属性的弹出框，通过设置view的平移动画，达到从底部弹出的样式。

---
##wxml
```html
    <!-- 屏幕背景变暗的背景 -->
    <view class="dialog_screen" bindtap="hideModal" wx:if="{{showModalStatus}}"></view>
    <!--弹出框  -->
    <view animation="{{animationData}}" class="dialog_box" wx:if="{{showModalStatus}}">
      xxxxxxxxxxxx //这个写弹出的内容
    </view>
```

## js
```js
//显示对话框
  showModal:() => {
    let animation = wx.createAnimation({
      duration: 150,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(() => {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    },150)
  },
  //隐藏对话框
  hideModal:() => {
    let animation = wx.createAnimation({
      duration: 150,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(() => {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    },150)
  }
```

#css
```css
/* 使屏幕变暗 */
.dialog_screen {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.78;
  overflow: hidden;
  z-index: 98;
  color: #fff;
}
/* 对话框 */
.dialog_box {
  width: 100%;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  background: #fff;
  padding-top: 20rpx;
}
```