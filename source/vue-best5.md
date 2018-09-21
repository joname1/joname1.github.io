title: Vue.js最佳五招实践
date: 2017-12-13 11:23:54 +0800
update: 2017-12-13 14:00:00 +0800
author: me
tags:
    - Vue
preview: 对大部分人来说，掌握Vue.js基本的几个API后就已经能够正常地开发前端网站。但如果你想更加高效地使用Vue来开发，成为Vue.js大师，那下面我要传授的这五招你一定得认真学习一下了。

---
## 1. 化繁为简的Watch

```js
created(){
    this.fetchPostList()
},
watch: {
    searchInputValue(){
        this.fetchPostList()
    }
}
```
组件创建的时候我们获取一次列表，同时监听input框，每当发生变化的时候重新获取一次筛选后的列表这个场景很常见，有没有办法优化一下呢?

招式：
首先，在watch中，可以直接使用函数的字面量名称；其次，声明 **immediate:true** 表示创建组件时立马执行一次。

```js
watch: {
    searchInputValue:{
        handler: 'fetchPostList',
        immediate: true
    }
```

## 2. 一劳永逸的组件注册

```js
import BaseButton from './baseButton'
import BaseIcon from './baseIcon'
import BaseInput from './baseInput'

export default {
  components: {
    BaseButton,
    BaseIcon,
    BaseInput
  }
}
```

```html
<BaseInput
  v-model="searchText"
  @keydown.enter="search"
/>
<BaseButton @click="search">
  <BaseIcon name="search"/>
</BaseButton>
```

我们写了一堆基础UI组件，然后每次我们需要使用这些组件的时候，都得先import，然后声明components，很繁琐！秉持能偷懒就偷懒的原则，我们要想办法优化！

招式：
我们需要借助一下神器webpack，使用 require.context() 方法来创建自己的（模块）上下文，从而实现自动动态require组件。这个方法需要3个参数：要搜索的文件夹目录，是否还应该搜索它的子目录，以及一个匹配文件的正则表达式。

我们在components文件夹添加一个叫global.js的文件，在这个文件里借助webpack动态将需要的基础组件统统打包进来。

```js
import Vue from 'vue'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const requireComponent = require.context(
  '.', false, /\.vue$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = capitalizeFirstLetter(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})
```
最后我们在main.js中import 'components/global.js'，然后我们就可以随时随地使用这些基础组件，无需手动引入了。

## 3. 釜底抽薪的router key


下面这个场景真的是伤透了很多程序员的心…先默认大家用的是Vue-router来实现路由的控制。
假设我们在写一个博客网站，需求是从/post-page/a，跳转到/post-page/b。然后我们惊人的发现，页面跳转后数据竟然没更新？！原因是vue-router”智能地”发现这是同一个组件，然后它就决定要复用这个组件，所以你在created函数里写的方法压根就没执行。通常的解决方案是监听$route的变化来初始化数据，如下：

```js
data() {
  return {
    loading: false,
    error: null,
    post: null
  }
},
watch: {
  '$route': {
    handler: 'resetData',
    immediate: true
  }
},
methods: {
  resetData() {
    this.loading = false
    this.error = null
    this.post = null
    this.getPost(this.$route.params.id)
  },
  getPost(id){
    ......
  }
}
```
bug是解决了，可每次这么写也太不优雅了吧？秉持着能偷懒则偷懒的原则，我们希望代码这样写：

```js
data() {
  return {
    loading: false,
    error: null,
    post: null
  }
},
created () {
  this.getPost(this.$route.params.id)
},
methods () {
  getPost(postId) {
    ......
  }
}
```
招式：
那要怎么样才能实现这样的效果呢，答案是给router-view添加一个unique的key，这样即使是公用组件，只要url变化了，就一定会重新创建这个组件。（虽然损失了一丢丢性能，但避免了无限的bug）。同时，注意我将key直接设置为路由的完整路径，一举两得。

```js
<router-view :key="$route.fullpath"></router-view>
```

## 第四招: 无所不能的render函数

vue要求每一个组件都只能有一个根元素，当你有多个根元素时，vue就会给你报错

```js
<template>
  <li
    v-for="route in routes"
    :key="route.name"
  >
    <router-link :to="route">
      {{ route.title }}
    </router-link>
  </li>
</template>


 ERROR - Component template should contain exactly one root element.
    If you are using v-if on multiple elements, use v-else-if
    to chain them instead.
```

招式：
那有没有办法化解呢，答案是有的，只不过这时候我们需要使用render()函数来创建HTML，而不是template。其实用js来生成html的好处就是极度的灵活功能强大，而且你不需要去学习使用vue的那些功能有限的指令API，比如v-for, v-if。（reactjs就完全丢弃了template）

```js
functional: true,
render(h, { props }) {
  return props.routes.map(route =>
    <li key={route.name}>
      <router-link to={route}>
        {route.title}
      </router-link>
    </li>
  )
}
```

## 5. 无招胜有招的高阶组件

当我们写组件的时候，通常我们都需要从父组件传递一系列的props到子组件，同时父组件监听子组件emit过来的一系列事件。举例子：

```js
//父组件
<BaseInput
    :value="value"
    label="密码"
    placeholder="请填写密码"
    @input="handleInput"
    @focus="handleFocus"
</BaseInput>


//子组件
<template>
  <label>
    {{ label }}
    <input
      :value="value"
      :placeholder="placeholder"
      @focus=$emit('focus', $event)"
      @input="$emit('input', $event.target.value)">
  </label>
</template>
```

招数：

* 1.每一个从父组件传到子组件的props,我们都得在子组件的Props中显式的声明才能使用。这样一来，我们的子组件每次都需要申明一大堆props, 而类似placeholer这种dom原生的property我们其实完全可以直接从父传到子，无需声明。方法如下：

```js
 <input
   :value="value"
   v-bind="$attrs"
   @input="$emit('input', $event.target.value)"
 >
```

$attrs包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定，并且可以通过 v-bind=”$attrs” 传入内部组件——在创建更高层次的组件时非常有用。

* 2.注意到子组件的@focus=$emit('focus', $event)"其实什么都没做，只是把event传回给父组件而已，那其实和上面类似，我完全没必要显式地申明：

```js
<input
    :value="value"
    v-bind="$attrs"
    v-on="listeners"
>

computed: {
  listeners() {
    return {
      ...this.$listeners,
      input: event =>
        this.$emit('input', event.target.value)
    }
  }
}
```
$listeners包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on=”$listeners” 传入内部组件——在创建更高层次的组件时非常有用。

* 3.需要注意的是，由于我们input并不是BaseInput这个组件的根节点，而默认情况下父作用域的不被认作 props 的特性绑定将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。所以我们需要设置inheritAttrs:false，这些默认行为将会被去掉, 以上两点的优化才能成功。
