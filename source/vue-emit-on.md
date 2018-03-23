title: Vue用$emit与$on来进行兄弟组件之间的通信
date: 2017-08-23 11:23:54 +0800
update: 2017-08-23 12:00:00 +0800
author: me
tags:
    - Vue
preview: 

---
Vue用$emit与$on来进行兄弟组件之间的通信
```html
<template>
  <div id="app">
    <dom-a></dom-a>   
    <dom-b></dom-b>   
    <dom-c></dom-c>   
  </div>
</template>
```

```js
  <script>
  var Event = new Vue();

  //组件A
  var A = {
    template: `
      <div>
        <span>我是A组件的数据->{{a}}</span>
        <input type="button" value="把A数据传给C" @click="send">
      </div>
    `,
    methods: {
      send () {
        Event.$emit("a-msg", this.a);
      }
    },
    data () {
      return {
        a: "我是a组件中数据"
      }
    }
  };
  //组件B
  var B = {
    template: `
      <div>
        <span>我是B组件的数据->{{a}}</span>
        <input type="button" value="把B数据传给C" @click = "send">
      </div>
    `,
    methods: {
      send () {
        Event.$emit("b-msg", this.a);
      }
    },
    data () {
      return {
        a: "我是b组件中数据"
      }
    }
  };
  //组件C
  var C = {
    template: `
      <div>
        <h3>我是C组件</h3>
        <span>接收过来A的数据为: {{a}}</span>
        <br>
        <span>接收过来B的数据为: {{b}}</span>
      </div>
    `,
    mounted () {
      //接收A组件的数据
      Event.$on("a-msg", function (a) {
        this.a = a;
      }.bind(this));

      //接收B组件的数据
      Event.$on("b-msg", function (a) {
        this.b = a;
      }.bind(this));
    },
    data () {
      return {
        a: "",
        b: ""
      }
    }
  };
  window.onload = function () {
    new Vue({
      el: "#app",
      components: {
        "dom-a": A,
        "dom-b": B,
        "dom-c": C
      }
    });
  };
  </script>
```
Vue用$emit与$on来进行跨页面之间的数据传输通信
on和emit的事件必须是在一个公共的实例上，才能触发。
```js
import Vue from 'vue'

export var bus = new Vue()
App.vue里created方法里定义事件
import { bus } from 'bus.js'

created () {
  bus.$on('tip', (text) => {
    alert(text)
  })
}
Test.vue组件内调用
import { bus } from 'bus.js'
bus.$emit('tip', '123')
```