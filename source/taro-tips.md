title: taro奥特曼变身前指北
date: 2018-09-11 11:23:54 +0800
update: 2018-09-11 14:00:00 +0800
author: me
tags:
    - taro
    - React
preview: 成功安装 Taro 后，进行开发前，我们有必要了解一下 Taro 的一些注意事项避免踩坑。

---
若使用微信开发者工具添加项目进行预览，添加的路径为项目根目录下的 dist 文件夹。由于 Taro 编译后的代码已经经过了转义和压缩，因此还需要在``设置-项目设置``关闭以下设置。

- 关闭ES6转ES5功能
- 关闭上传代码时样式自动补全
- 关闭代码压缩上传

### Taro 与 React 的差异
由于微信小程序的限制，React 中某些写法和特性在 Taro 中还未能实现，后续将会逐渐完善。

``暂不支持在 render() 之外的方法定义 JSX``

由于微信小程序的 template 不能动态传值和传入函数，Taro 暂时也没办法支持在类方法中定义 JSX。

- 规则详情
以下代码会被 ESLint 提示警告，同时在 Taro（小程序端）也不会有效：

```js
class App extends Component {
  _render() {
    return <View />
  }
}

class App extends Component {
  renderHeader(showHeader) {
    return showHeader && <Header />
  }
}

class App extends Component {
  renderHeader = (showHeader) => {
    return showHeader& & <Header />
  }
}
```

- 解决方案
在 render 方法中定义。

```js
class App extends Component {

  render () {
    const { showHeader, showMain } = this.state
    const header = showHeader && <Header />
    const main = showMain && <Main />
    return (
      <View>
        {header}
        {main}
      </View>
    )
  }
}
```

### 不能在包含 JSX 元素的 map 循环中使用 if 表达式
- 规则详情
以下代码会被 ESLint 提示警告，同时在 Taro（小程序端）也不会有效：

```js
products.map((number) => {
  let element = null
  const isOdd = number % 2
  if (isOdd) {
    element = <Custom />
  }
  return element
})
```

以下代码不会被警告，在 Taro 任意端中能够运行：

```js
products.map((number) => {
  let isOdd = false
  if (number % 2) {
    isOdd = true
  }
  return isOdd && <Custom />
})
```

- 解决方案
尽量在 map 循环中使用条件表达式或逻辑表达式。

```js
products.map((number) => {
  const isOdd = number % 2
  return isOdd ? <Custom /> : null
})

products.map((number) => {
  const isOdd = number % 2
  return isOdd && <Custom />
})
```

### 不能使用 Array#map 之外的方法操作 JSX 数组
Taro 在小程序端实际上把 JSX 转换成了字符串模板，而一个原生 JSX 表达式实际上是一个 React/Nerv 元素(react-element)的构造器，因此在原生 JSX 中你可以随意地一组 React 元素进行操作。但在 Taro 中你只能使用 map 方法，Taro 转换成小程序中 wx:for。

- 规则详情
以下代码会被 ESLint 提示警告，同时在 Taro（小程序端）也不会有效：

```js
test.push(<View />)

numbers.forEach(numbers => {
  if (someCase) {
    a = <View />
  }
})

test.shift(<View />)

components.find(component => {
  return component === <View />
})

components.some(component => component.constructor.__proto__ === <View />.constructor)
```

以下代码不会被警告，在 Taro 任意端中能够运行：

```js
numbers.filter(Boolean).map((number) => {
  const element = <View />
  return <View />
})
```

- 解决方案
先处理好需要遍历的数组，然后再用处理好的数组调用 map 方法。

```js
numbers.filter(isOdd).map((number) => <View />)

for (let index = 0; index < array.length; index++) {
  // blah blah	
}

const element = array.map(item => {
  return <View />
})
```

### 不能在 JSX 参数中使用匿名函数
- 规则详情
以下代码会被 ESLint 提示警告，同时在 Taro（小程序端）也不会有效：

```js
<View onClick={() => this.handleClick()} />
<View onClick={(e) => this.handleClick(e)} />
<View onClick={() => ({})} />
<View onClick={function () {}} />
<View onClick={function (e) {this.handleClick(e)}} />
```

以下代码不会被警告，在 Taro 任意端中能够运行：

```js
<View onClick={this.hanldeClick} />
<View onClick={this.props.hanldeClick} />
<View onClick={this.hanldeClick.bind(this)} />
<View onClick={this.props.hanldeClick.bind(this)} />
```
- 解决方案
使用 bind 或 类参数绑定函数。

```js
<View onClick={this.props.hanldeClick.bind(this)} />
```

### 不能在 JSX 参数中使用对象展开符
微信小程序组件要求每一个传入组件的参数都必须预先设定好，而对象展开符则是动态传入不固定数量的参数。所以 Taro 没有办法支持该功能。

- 规则详情
以下代码会被 ESLint 提示警告，同时在 Taro（小程序端）也不会有效：

```js
<View {...this.props} />
<View {...props} />
<Custom {...props} />
```

以下代码不会被警告，在 Taro 任意端中能够运行：

```js
const { id, ...rest } = obj
const [ head, ...tail]  = array
const obj = { id, ...rest }
```
- 解决方案
开发者自行赋值

```js
render () {
    const { id, title } = obj
    return <View id={id} title={title} />
}
```

### 不允许在 JSX 参数(props)中传入 JSX 元素
由于微信小程序内置的组件化的系统不能通过属性（props） 传函数，而 props 传递函数可以说 React 体系的根基之一，我们只能自己实现了一套组件化系统。而自制的组件化系统则不能使用内置组件化的 slot 功能。两权相害取其轻，我们暂时只能不支持该功能。

- 规则详情
以下代码会被 ESLint 提示警告，同时在 Taro（小程序端）也不会有效：

```js
<Custom child={<View />} />
<Custom child={() => <View />} />
<Custom child={function () { <View /> }} />
<Custom child={ary.map(a => <View />)} />
```

- 解决方案
通过 props 传值在 JSX 模板中预先判定显示内容，或通过 props.children 来嵌套子组件

### 不支持无状态组件（stateless component)
由于微信的 template 能力有限，不支持动态传值和函数，Taro 暂时只支持一个文件只定义一个组件。为了避免开发者疑惑，暂时不支持定义 stateless component。

- 规则详情
以下代码会被 ESLint 提示警告，同时在 Taro（小程序端）也不会有效：

```js
function Test () {
  return <View />
}

function Test (ary) {
  return ary.map(() => <View />)
}

const Test = () => {
  return <View />
}

const Test = function () {
  return <View />
}
```
以下代码不会被警告，在 Taro 任意端中能够运行：

```js
class App extends Component {
  render () {
    return (
      <View />
    )
  }
}
```
- 解决方案
使用 class 定义组件。