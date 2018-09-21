title: Vue自定义Loading、Toast组件
date: 2017-12-05 11:23:54 +0800
update: 2017-12-05 12:00:00 +0800
author: me
tags:
    - Vue
preview: 因项目登录界面用到Loading和Toast, 网上逛了一圈, 全是一整套组件, 有些东西又用不上, 太冗余了, 无奈自己撸个。

---
因项目登录界面用到Loading和Toast, 网上逛了一圈, 全是一整套组件, 有些东西又用不上, 太冗余了, 无奈自己撸个。

### 定义js和css

* JS

```js
var Toast = {};
var showToast = false,
  showLoad = false,
  toastVM = null,
  loadNode = null;

Toast.install = function (Vue, options) {
  var opt = {
    defaultType: 'bottom',
    duration: '2500',
    wordWrap: false
  };
  for (var property in options) {
    opt[property] = options[property];
  }

  Vue.prototype.$toast = function (tips, type) {
    var curType = type ? type : opt.defaultType;
    var wordWrap = opt.wordWrap ? 'lx-word-wrap' : '';
    var style = opt.width ? 'style="width: ' + opt.width + '"' : '';
    var tmp = '<div v-show="show" :class="type" class="lx-toast ' + wordWrap + '" ' + style + '>{{tip}}</div>';

    if (showToast) {
      return;
    }
    if (!toastVM) {
      var toastTpl = Vue.extend({
        data: function () {
          return {
            show: showToast,
            tip: tips,
            type: 'lx-toast-' + curType
          }
        },
        template: tmp
      });
      toastVM = new toastTpl()
      var tpl = toastVM.$mount().$el;
      document.body.appendChild(tpl);
    }
    toastVM.type = 'lx-toast-' + curType;
    toastVM.tip = tips;
    toastVM.show = showToast = true;

    setTimeout(function () {
      toastVM.show = showToast = false;
    }, opt.duration)
  };

  ['bottom', 'center', 'top'].forEach(function (type) {
    Vue.prototype.$toast[type] = function (tips) {
      return Vue.prototype.$toast(tips, type)
    }
  });

  Vue.prototype.$loading = function (tips, type) {
    if (type == 'close') {
      loadNode.show = showLoad = false;
    } else {
      if (showLoad) {
        return;
      }
      var loadTpl = Vue.extend({
        data: function () {
          return {
            show: showLoad
          }
        },
        template: '<div v-show="show" class="lx-load-mark"><div class="lx-load-box"><div class="lx-loading"><div class="loading loading_0"></div><div class="loading loading_1"></div><div class="loading loading_2"></div><div class="loading loading_3"></div><div class="loading loading_4"></div><div class="loading loading_5"></div><div class="loading loading_6"></div><div class="loading loading_7"></div><div class="loading loading_8"></div><div class="loading loading_9"></div><div class="loading loading_10"></div><div class="loading loading_11"></div></div><div class="lx-load-content">' + tips + '</div></div></div>'
      });
      loadNode = new loadTpl();
      var tpl = loadNode.$mount().$el;
      document.body.appendChild(tpl);
      loadNode.show = showLoad = true;
    }
  };

  ['open', 'close'].forEach(function (type) {
    Vue.prototype.$loading[type] = function (tips) {
      return Vue.prototype.$loading(tips, type)
    }
  });
}

module.exports = Toast;
```

* CSS

```css
.lx-toast {position:fixed;bottom:100px;left:50%;box-sizing:border-box;max-width:80%;height:40px;line-height:20px;padding:10px 20px;transform:translateX(-50%);-webkit-transform:translateX(-50%);text-align:center;z-index:9999;font-size:14px;color:#fff;border-radius:5px;background:rgba(0,0,0,0.7);animation:show-toast .5s;-webkit-animation:show-toast .5s;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.lx-toast.lx-word-wrap {width:80%;white-space:inherit;height:auto;}
.lx-toast.lx-toast-top {top:50px;bottom:inherit;}
.lx-toast.lx-toast-center {top:50%;margin-top:-20px;bottom:inherit;}
@keyframes show-toast {from {opacity:0;transform:translate(-50%,-10px);-webkit-transform:translate(-50%,-10px);}
to {opacity:1;transform:translate(-50%,0);-webkit-transform:translate(-50%,0);}
}
.lx-load-mark {position:fixed;left:0;top:0;width:100%;height:100%;z-index:9999;}
.lx-load-box {position:fixed;z-index:3;width:7.6em;min-height:7.6em;top:180px;left:50%;margin-left:-3.8em;background:rgba(0,0,0,0.7);text-align:center;border-radius:5px;color:#FFFFFF;}
.lx-load-content {margin-top:64%;font-size:14px;}
.lx-loading {position:absolute;width:0px;left:50%;top:38%;}
.loading {position:absolute;top:-1px;opacity:0.25;}
.loading:before {content:" ";position:absolute;width:9.14px;height:3.08px;background:#d1d1d5;box-shadow:rgba(0,0,0,0.0980392) 0px 0px 1px;border-radius:1px;-webkit-transform-origin:left 50% 0px;transform-origin:left 50% 0px;}
.loading_0 {-webkit-animation:opacity-0 1.25s linear infinite;animation:opacity-0 1.25s linear infinite;}
.loading_0:before {-webkit-transform:rotate(0deg) translate(7.92px,0px);transform:rotate(0deg) translate(7.92px,0px);}
.loading_1 {-webkit-animation:opacity-1 1.25s linear infinite;animation:opacity-1 1.25s linear infinite;}
.loading_1:before {-webkit-transform:rotate(30deg) translate(7.92px,0px);transform:rotate(30deg) translate(7.92px,0px);}
.loading_2 {-webkit-animation:opacity-2 1.25s linear infinite;animation:opacity-2 1.25s linear infinite;}
.loading_2:before {-webkit-transform:rotate(60deg) translate(7.92px,0px);transform:rotate(60deg) translate(7.92px,0px);}
.loading_3 {-webkit-animation:opacity-3 1.25s linear infinite;animation:opacity-3 1.25s linear infinite;}
.loading_3:before {-webkit-transform:rotate(90deg) translate(7.92px,0px);transform:rotate(90deg) translate(7.92px,0px);}
.loading_4 {-webkit-animation:opacity-4 1.25s linear infinite;animation:opacity-4 1.25s linear infinite;}
.loading_4:before {-webkit-transform:rotate(120deg) translate(7.92px,0px);transform:rotate(120deg) translate(7.92px,0px);}
.loading_5 {-webkit-animation:opacity-5 1.25s linear infinite;animation:opacity-5 1.25s linear infinite;}
.loading_5:before {-webkit-transform:rotate(150deg) translate(7.92px,0px);transform:rotate(150deg) translate(7.92px,0px);}
.loading_6 {-webkit-animation:opacity-6 1.25s linear infinite;animation:opacity-6 1.25s linear infinite;}
.loading_6:before {-webkit-transform:rotate(180deg) translate(7.92px,0px);transform:rotate(180deg) translate(7.92px,0px);}
.loading_7 {-webkit-animation:opacity-7 1.25s linear infinite;animation:opacity-7 1.25s linear infinite;}
.loading_7:before {-webkit-transform:rotate(210deg) translate(7.92px,0px);transform:rotate(210deg) translate(7.92px,0px);}
.loading_8 {-webkit-animation:opacity-8 1.25s linear infinite;animation:opacity-8 1.25s linear infinite;}
.loading_8:before {-webkit-transform:rotate(240deg) translate(7.92px,0px);transform:rotate(240deg) translate(7.92px,0px);}
.loading_9 {-webkit-animation:opacity-9 1.25s linear infinite;animation:opacity-9 1.25s linear infinite;}
.loading_9:before {-webkit-transform:rotate(270deg) translate(7.92px,0px);transform:rotate(270deg) translate(7.92px,0px);}
.loading_10 {-webkit-animation:opacity-10 1.25s linear infinite;animation:opacity-10 1.25s linear infinite;}
.loading_10:before {-webkit-transform:rotate(300deg) translate(7.92px,0px);transform:rotate(300deg) translate(7.92px,0px);}
.loading_11 {-webkit-animation:opacity-11 1.25s linear infinite;animation:opacity-11 1.25s linear infinite;}
.loading_11:before {-webkit-transform:rotate(330deg) translate(7.92px,0px);transform:rotate(330deg) translate(7.92px,0px);}
@-webkit-keyframes opacity-0 {0% {opacity:0.25;}
0.01% {opacity:0.25;}
0.02% {opacity:1;}
60.01% {opacity:0.25;}
100% {opacity:0.25;}
}
@-webkit-keyframes opacity-1 {0% {opacity:0.25;}
8.34333% {opacity:0.25;}
8.35333% {opacity:1;}
68.3433% {opacity:0.25;}
100% {opacity:0.25;}
}
@-webkit-keyframes opacity-2 {0% {opacity:0.25;}
16.6767% {opacity:0.25;}
16.6867% {opacity:1;}
76.6767% {opacity:0.25;}
100% {opacity:0.25;}
}
@-webkit-keyframes opacity-3 {0% {opacity:0.25;}
25.01% {opacity:0.25;}
25.02% {opacity:1;}
85.01% {opacity:0.25;}
100% {opacity:0.25;}
}
@-webkit-keyframes opacity-4 {0% {opacity:0.25;}
33.3433% {opacity:0.25;}
33.3533% {opacity:1;}
93.3433% {opacity:0.25;}
100% {opacity:0.25;}
}
@-webkit-keyframes opacity-5 {0% {opacity:0.270958333333333;}
41.6767% {opacity:0.25;}
41.6867% {opacity:1;}
1.67667% {opacity:0.25;}
100% {opacity:0.270958333333333;}
}
@-webkit-keyframes opacity-6 {0% {opacity:0.375125;}
50.01% {opacity:0.25;}
50.02% {opacity:1;}
10.01% {opacity:0.25;}
100% {opacity:0.375125;}
}
@-webkit-keyframes opacity-7 {0% {opacity:0.479291666666667;}
58.3433% {opacity:0.25;}
58.3533% {opacity:1;}
18.3433% {opacity:0.25;}
100% {opacity:0.479291666666667;}
}
@-webkit-keyframes opacity-8 {0% {opacity:0.583458333333333;}
66.6767% {opacity:0.25;}
66.6867% {opacity:1;}
26.6767% {opacity:0.25;}
100% {opacity:0.583458333333333;}
}
@-webkit-keyframes opacity-9 {0% {opacity:0.687625;}
75.01% {opacity:0.25;}
75.02% {opacity:1;}
35.01% {opacity:0.25;}
100% {opacity:0.687625;}
}
@-webkit-keyframes opacity-10 {0% {opacity:0.791791666666667;}
83.3433% {opacity:0.25;}
83.3533% {opacity:1;}
43.3433% {opacity:0.25;}
100% {opacity:0.791791666666667;}
}
@-webkit-keyframes opacity-11 {0% {opacity:0.895958333333333;}
91.6767% {opacity:0.25;}
91.6867% {opacity:1;}
51.6767% {opacity:0.25;}
100% {opacity:0.895958333333333;}
}
```

### Main.js引入Toast

```js
import './components/Toast/toast.css';
import Toast from './components/Toast/toast.js';

Vue.use(Toast);
```

### 页面调用

```js
this.$toast.top('要显示内容'); //在顶部显示
```

```js
this.$toast.center('要显示内容'); //在中部显示
```

```js
this.$toast.bottom('要显示内容'); //在低部显示(默认在底部显示)
```

```js
this.$loading('要显示内容'); //显示Loading
```

```js
this.$loading.close(); //关闭Loading
```
