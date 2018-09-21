title: React Native爬坑之路 02 Props
date: 2018-03-23 11:23:54 +0800
update: 2018-03-23 12:00:00 +0800
author: me
tags:
    - React Native
preview: Props是组件自身的属性，一般用于嵌套的内外层组件中，负责传递信息（通常由父层组件向子层组件传递）。

---
Props官网的介绍是：

> Most components can be customized when they are created, with different parameters. These creation parameters are called props.

意思是：组件可以在创建时使用不同的参数进行自定义，这些参数就是Props。
官网给我们举了一个例子：
```js
import React, { Component } from 'react';
import { AppRegistry, Image } from 'react-native';

class Bananas extends Component {
  render() {
    return (
      <Image source={{ uri: 'https://www.x.com/xxoo.jpg'}} style={{width: 10, height: 20}}/>
    );
  }
}

AppRegistry.registerComponent('Bananas', () => Bananas);
```
source就是Image 这个组件的一个属性，同理 style也是。
再来看一个button的例子
```js
render(){
  return(
    <Button
      onPress={onButtonPress}
      title="Press Me"
      accessibilityLabel="See an informative alert"
    />
  );
  }
```
到这里我们应该基本了解了什么是Props吧，在以后实际开发过程中，可以通过API了解各个组件的属性。

以上说的都是已有组件的属性那么我们自定义组件时该如何设置属性呢？官网给的解决办法是：在自定义组件的渲染函数（render）中通过this.props定义你的属性即可。
还是来看官网的例子（略微修改了一下）
```js
class Greeting extends Component {
  render() {
    return (
      <Text>{this.props.name}</Text>
    );
  }
}
```
我们在Greeting 这个自定义组件的渲染函数中通过<Text>组件定义了一个名为name的属性，注意看name前边的this.props，同时注意this.props.name是被{}包裹起来的。
如何使用
```js
class LotsOfGreetings extends Component {
  render() {
    return (
      <View >
           <Greeting name='Android'></Greeting>
           <Greeting name='iOS'></Greeting>
           <Greeting name='WindowPhone'></Greeting>
      </View>
    );
  }
}
```


修改一下Greeting的属性
```js
class Greeting extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.name}</Text>
        <Text>{this.props.subname}</Text>
      </View>
    );
  }
}

class LotsOfGreetings extends Component {
  render() {
    return (
      <View >
           <Greeting name='Android' subname='iOS'></Greeting>
      </View>
    );
  }
}
```
实现了同样的效果，所以说属性的使用方式还是很灵活的官网其实也说了，实际开发过程中可能需要自定义各种各样的组件，合理使用好组件的属性，从而达到想要的效果。
