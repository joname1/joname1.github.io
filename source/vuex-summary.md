title: Vuex 学习总结
date: 2017-09-11 11:23:54 +0800
update: 2017-09-11 12:00:00 +0800
author: me
tags:
    - Vue
    - Vuex
preview: 对于很多新手来说，只是阅读文档是不好消化，我的建议是看看 vuex的实例，通过研究实例来学习vuex。这样就会好理解多了。如果还是不能理解，最好办法就是先把store 的四个属性：state， getters, mutations, actions。

---
对于很多新手来说，只是阅读文档是不好消化，我的建议是看看 vuex 的实例，通过研究实例来学习vuex。这样就会好理解多了。如果还是不能理解，最好办法就是先把store 的四个属性：state， getters, mutations, actions 记下来，然后再分析四个属性的特点，什么地方会用到，是怎样连接在一起的？通过这样问自己问题来进行学习。

简单来说，vuex 就是使用一个 store 对象来包含所有的应用层级状态，也就是数据的来源。当然如果应用比较庞大，我们可以将 store 模块化，也就是每个模块都有自己的 store。一个 store 有四个属性：state, getters, mutations, actions。
#### 1、State
state 上存放的，说的简单一些就是变量，也就是所谓的状态。没有使用 state 的时候，我们都是直接在 data 中进行初始化的，但是有了 state 之后，我们就把 data 上的数据转移到 state 上去了。当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：

其实就是把 state 上保存的变量转移到计算属性上。当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
```js
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```
为了更好地理解这个函数的作用，我们可以看看它的源代码。
可以看到，mapstate 即可以接受对象，也可以接受数组。最终返回的是一个对象。并且 res[key] 的值都是来于 store 里的，红色那条代码就是。这样就把两个不相关的属性连接起来了,这也是映射。其他几个辅助函数也是类似的。

#### 2、Getters
getters上简单来说就是存放一些公共函数供组件调用。getters 会暴露为 store.getters 对象，也就是说可以通过 store .getters[属性]来进行相应的调用。mapGetters 辅助函数仅仅是将 store 中的 getters 映射到局部计算属性，其实也就是从 getters 中获取对应的属性，跟解构类似。具体如下图这样我们就可以将 getters 中的 evenOrOdd 属性值传给对应组件中的 evenOrOdd 上。Getters 接受 state 作为其第一个参数，Getters 也可以接受其他 getters 作为第二个参数。

#### 3、Mutations
mutations 与事件类似，更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。所以 mutations 上存放的一般就是我们要改变 state 的一些方法。

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```
我们不能直接调用一个 mutation handler。 这个选项更像是事件注册 ：“当触发一个类型为 increment 的 mutation 时，调用此函数 。”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：
```js
store.commit('increment')
```
当 mutation 事件类型比较多的时候，我们可以使用常量替代 mutation 事件类型。同时把这些常量放在单独的文件中可以让我们的代码合作者对整个 app 包含的 mutation 一目了然：
一条重要的原则就是要记住 mutation 必须是同步函数 。

#### 4、Actions

前面说了， mutation 像事件注册，需要相应的触发条件。而 Action 就那个管理触发条件的。
Action 类似于 mutation，不同在于：Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。
```js
actions: {
    increment (context) {
      context.commit('increment')
    }
  }
```
Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。

实践中，我们会经常会用到 ES2015 的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候）
```js
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```
还记得我们前面说过 mutation 像事件类型吗？因此需要我们给定某个动作来进行触发。而这就是分发 action。Action 通过 store.dispatch 方法触发：
```js
store.dispatch('increment')
```
此外，我们还可以在我们可以在 action 内部执行 异步 操作：
```js
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```
你在组件中使用``this.$store.dispatch('xxx')`` 分发 action，或者使用``mapActions``辅助函数将组件的 methods 映射为``store.dispatch``调用（需要先在根节点注入 store ）：
```js
import { mapActions } from 'vuex'
export default {
  // ...
  methods: {
    ...mapActions([
      'increment' // 映射 this.increment() 为 this.$store.dispatch('increment')
    ]),
    ...mapActions({
      add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    })
  }
}
```
这句话意思其实是，当你使用了 ``mapActions``， 你就不需要再次使用 ``this.$store.dispatch('xxx')``，当你没使用的话，你可以需要手动去分法。
什么时候用大家要根据情况而定的。