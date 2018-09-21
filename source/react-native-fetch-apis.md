title: React Native爬坑之路 04 Fetch APIs
date: 2018-04-22 10:23:54 +0800
update: 2018-04-22 11:00:00 +0800
author: me
tags:
    - React Native
preview: 本来是准备用axios的，但是发现官方推荐用Fetch，吼啊，一颗赛艇。

---
看了后端小伙伴丢来的接口文档，这回终于不用写死数据了，立马从api接口拿数据。

首先新建个 **utils** 文件夹，然后新建个 **api.js**，然后把api接口封装好暴露出去：

```js
  let api = {
    //封装请求的接口
    getList() {
      let url = `https://www.xxx.com/v1/getlist`;
      return fetch(url).then((res) => res.json());
    }
  }

module.exports = api; //暴露出去
```

然后到需要请求该接口的页面 **import** 进来：

```js
import api from '../utils/api'

class GETLIST extends Component {
  //构造方法
  constructor(props) {
    super(props);
    this.state = {
      //List初始化
      List: []
    }
  }

  //在生命周期中执行该function
  componentWillMount() {
    api.getlist().then((res) => {
      //从接口拿到数据并修改List
      this.setState({
        List: res.data
      })
    });
  }

  render() {
    return(
      <View>
        <Text>
          {this.state.List}
        </Text>
      </View>
    );
  }
}
```
