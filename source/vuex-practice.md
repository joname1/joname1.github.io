title: Vuex存值、取值的操作
date: 2017-09-13 11:23:54 +0800
update: 2017-09-13 14:00:00 +0800
author: me
tags:
    - Vue
    - Vuex
preview: 每天都要进步一点点。

---
## 传值

```js
// 定义参数
let params = {
  workItemId: 1,
  flowInstId: 21,
  itemStatus: false,
  type: type,
  srcId: srcId
}
// 保存参数
this.$store.dispatch('approvalParams', params);
```

* index.js

```js

import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    mutations
  },
  actions
});
```

* types.js

```js
// 审批历史页请求参数
export const APPROVAL_HISTORY_PARAMS = 'APPROVAL_HISTORY_PARAMS';
```

* actions.js

```js
// 引入 状态(类型),用于提交到mutations
import * as types from './types'

// 导出
export default {
  // 保存 请求参数 approvalHistoryParams为上面的"action名"
  approvalHistoryParams: ({commit}, res) => {
    // 此处是触发mutation的 STORE_MOVIE_ID为"mutation名"
    commit(types.APPROVAL_HISTORY_PARAMS, res);
  }
}
```

* mutations.js

```js
import {
  APPROVAL_HISTORY_PARAMS // 审批历史参数
} from './types'

// 引入 getters
import getters from './getters'

// 定义、初始化数据
const state = {
  approvalHistoryParams:{}
}

// 定义 mutations
const mutations = {
  // 匹配actions通过commit传过来的值,并改变state上的属性的值
  // 审批历史页 请求参数
  [APPROVAL_HISTORY_PARAMS](state, res){
    state.approvalHistoryParams = res;   //state.数据名 = data
  }
}

// 导出
export default {
  state,
  mutations,
  getters
}
```

 * getters.js

```js
// 导出
export default {
  // 获取 审批历史参数
  approvalHistoryParams: (state) => {
    return state.approvalHistoryParams;
  }
}
```

## 取值

```js
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([//...函数名 使用对象展开运算符将此对象混入到外部对象中
      'approvalHistoryParams'
    ])
  },
  methods: {
    fetchData(){
      console.log(this.approvalHistoryParams.name);
    }
  }
}
```

## PS

* dispatch

异步操作，例如向后台提交数据，写法：**this.$store.dispatch('mutations_name', val)**

* commit

同步操作，写法：**this.$store.commit('mutations_name', val)**
