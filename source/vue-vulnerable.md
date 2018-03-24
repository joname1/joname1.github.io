title: Vue 使用中踩过的坑
date: 2017-12-18 18:23:54 +0800
update: 2017-12-18 21:00:00 +0800
author: me
tags:
    - Vue
preview: vue如今可谓是一匹黑马，github star数已居第一位！前端开发对于vue的使用已经越来越多，它的优点就不做介绍了，本篇是我在使用vue过程中遇到的一些惊(坑)喜(爹)。

---
## 1. 路由变化页面数据不刷新问题
出现这种情况是因为依赖路由的params参数获取写在created生命周期里面,因为相同路由二次甚至多次加载的关系 没有达到监听，退出页面再进入另一个文章页面并不会运行created组件生命周期,导致文章数据还是第一次进入的数据。

- 解决方法：watch监听路由是否变化。

```js
 watch: {
 // 方法1
  '$route' (to, from) { //监听路由是否变化
    if(this.$route.params.articleId){// 判断条件1  判断传递值的变化
      //获取文章数据
    }
  }
  //方法2
  '$route'(to, from) {
    if (to.path == "/page") {    /// 判断条件2  监听路由名 监听你从什么路由跳转过来的
       this.message = this.$route.query.msg     
    }
  }
  
}
```

## 2. 异步回调函数中使用this无法指向vue实例对象
- 解决方法：变量赋值和箭头函数。

```js
 //使用变量访问this实例
let self=this;   
    setTimeout(function () {  
      console.log(self);//使用self变量访问this实例
    },1000);
    
 //箭头函数访问this实例 因为箭头函数本身没有绑定this
 setTimeout(() => { 
   console.log(this);
 }, 500);
 ```

## 3. setInterval路由跳转继续运行并没有及时进行销毁
比如一些弹幕，走马灯文字，这类需要定时调用的，路由跳转之后，因为组件已经销毁了，但是setInterval还没有销毁，还在继续后台调用，控制台会不断报错，如果运算量大的话，无法及时清除，会导致严重的页面卡顿。

- 解决办法：在组件生命周期beforeDestroy停止setInterval。

```js
//组件销毁前执行的钩子函数，跟其他生命周期钩子函数的用法相同。
beforeDestroy(){
     //我通常是把setInterval()定时器赋值给this实例，然后就可以像下面这么停止。
    clearInterval(this.intervalId);
},
```

## 4. 实现vue路由拦截浏览器的需求,进行一系列操作 草稿保存等等
为了防止用户失误点错关闭按钮等等，导致没有保存已输入的信息(关键信息)。

- 解决方法：(见下方代码)

```js
beforeRouteLeave (to, from, next) {
  if(用户已经输入信息){
    //出现弹窗提醒保存草稿，或者自动后台为其保存
  }else{
    next(true);//用户离开
  }
}
```

## 5. vue本地代理配置 解决跨域问题,仅限于dev环境
这个本地代理用来解决开发环境下的跨域问题,跨域可谓老生常谈的问题了，proxy 在vue中配置代理非常简单。

- 解决方法：(见下方代码)

```js
//比方说你要访问 http://192.168.1.xxx:8888/backEnd/paper这个接口
//配置  config.js下面proxyTable对象
proxyTable: {
            '/backEnd':{
                target:'http://192.168.1.xxx:8888', //目标接口域名有端口可以把端口也写上
                changeOrigin:true
            }
},
// 发送request请求
   axios.get('/backEnd/page')  //按代理配置 匹配到/backEnd就代理到目标target地址
    .then((res) => {
       console.log(res) // 数据完全拿得到  配置成功
      this.newsList = res.data
    }, (err) => {
      console.log(err)
    })
```