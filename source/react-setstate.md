title: React setState 数组、对象多种方式
date: 2020-01-25 15:23:54 +0800
update: 2020-01-25 19:00:00 +0800
author: me
tags:
    - React
preview: State用来设置会变换的数据。State相当重要，所有的UI界面变化都离不开State。

---
### 修改object中某项
```js
this.setState({
  object: {...object, key: value}
});
```

### 删除数组首位
```js
array.splice(0, 1);
this.setState({
  array
});
```

### 删除数组尾部
```js
array.splice(array.length - 1);
this.setState({
  array
});
```

### 删除数组任意一项
```js
array.splice(index, 1);
this.setState({
  array
});
```

### 数组尾部添加一项
```js
this.setState({
  array: [...array, item]
});
```

### 数组头部添加一项
```js
this.setState({
  array: [item, ...array]
});
```

### 数组任意位置添加一项
```js
array.splice(index, 0, item);
this.setState({
  array
});
```

### 修改数组中任意一项中值
```js
function updateArrayItem(index, key, value) {
  this.setState({
    array: array.map((item, _index) => _index == index ? {...item, [key]: value} : item)
  });
}
```

### 复杂类型修改
```js
this.setState(prevState => return newState);
```