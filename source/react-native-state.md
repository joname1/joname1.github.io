title: React Native爬坑之路 03 State
date: 2018-03-25 11:23:54 +0800
update: 2018-03-25 12:00:00 +0800
author: me
tags:
    - React Native
preview: React native的组件可以通过两种方式进行状态控制，一种是Props用来设置不会改变的数据，另一种就是State，用来设置会变换的数据。State相当重要，所有的UI界面变化都离不开State。

---
State的使用方式是在组件的构造函数中初始化State，在合适的地方调用setState方法，首先来看官方的例子，官方给出了一个文字闪烁的效果：
```js
class Blink extends Component {
  constructor(props) {
      super(props);
      this.state = {showText: true};//这里设置了一个showText，默认值为true
      // Toggle the state every second
      setInterval(() => {
        this.setState({ showText: !this.state.showText });
      }, 1000);//这里是一个定时器，每1s会执行一次，调用定时器中的方法，重新给state赋值，注意this.state.showText是获取当前showText的值，同时需要注意的是调用this.setState()后回自动调用 render() 方法从而实现界面的刷新。
    }
    render() {
      let display = this.state.showText ? this.props.text : ' ';//这里通过showText 的值决定diaplay的值，如果为ture 则显示this.props.text属性的值，否则显示‘ ’，this.props.text为自定义属性，let等同于var；
      return (
        <Text>{display}</Text>
      );
    }
  }
```
在启动组件中使用
```js
class BlinkApp extends Component {
  render() {
    return (
      <View>
        <Blink text='I love to blink' />
        <Blink text='Yes blinking is so great' />
        <Blink text='Why did they ever take this out of HTML' />
        <Blink text='Look at me look at me look at me' />
      </View>
    );
  }
}
```
