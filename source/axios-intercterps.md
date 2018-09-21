title: axios token验证拦截器
date: 2018-05-20 11:23:54 +0800
update: 2018-05-20 14:00:00 +0800
author: me
tags:
    - Axios
    - Vue
preview: 因项目每次都要带token进行操作, 这时候可以用axios的http拦截, 每次路由跳转, 都先让后台验证一下token是否有效, 在http头添加token,

---
```js
import axios from 'axios';
// req拦截
axios.interceptors.request.use(
  let token = localStorage.getItem('token')
    config => {
        if (token === null) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// res拦截
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.code === 401) {
            // 返回 401 跳转到登录页面
            router.replace({
                path: 'login',
                query: {redirect: router.currentRoute.fullPath}
            })
        }
        return Promise.reject(error.response.msg)   // 返回接口返回的错误信息
    });
```
PS: 建议把拦截器独立到一个js文件，然后在引入。
