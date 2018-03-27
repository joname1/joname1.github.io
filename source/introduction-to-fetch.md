title: 浅谈fetch及跨域
date: 2018-01-08 10:23:54 +0800
update: 2018-01-08 20:00:00 +0800
author: me
tags:
    - fetch
    - ES6
preview: fetch能让我们完成类似 XMLHttpRequest (XHR) 提供的ajax功能。它的主要区别是，Fetch API 使用了 Promise，它让接口更简单、简洁，避免了回调的复杂性，省去了使用复杂的 XMLHttpRequest API。

---
由于 FetchAPI 是基于 Promise 设计，有必要先学习一下 Promise

## 语法说明

```js
fetch(url, options).then((res) => {
    // handle HTTP response
}).catch((err) => {
	// handle network error
})
```

## 参数说明

### url

定义要获取的资源。这可能是：

* 一个 USVString 字符串，包含要获取资源的 URL。
* 一个 Request 对象。

### options（可选）

一个配置项对象，包括所有对请求的设置。可选的参数有：

* method: 请求使用的方法，如 GET、POST。
* headers: 请求的头信息，形式为 Headers 对象或 ByteString。
* body: 请求的 body 信息：可能是一个 Blob、BufferSource、FormData、URLSearchParams 或者 USVString 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。
* mode: 请求的模式，如 cors、 no-cors 或者 same-origin。
* credentials: 请求的 credentials，如 omit、same-origin 或者 include。
* cache: 请求的 cache 模式: default, no-store, reload, no-cache, force-cache, 或者 only-if-cached。

### response

一个 Promise，resolve 时回传 Response 对象：

* 属性：

1. status (number) - HTTP请求结果参数，在100–599 范围
2. statusText (String) - 服务器返回的状态报告
3. ok (boolean) - 如果返回200表示请求成功则为true
4. headers (Headers) - 返回头部信息，下面详细介绍
5. url (String) - 请求的地址

* 方法：

1. text() - 以string的形式生成请求text
2. json() - 生成JSON.parse(responseText)的结果
3. blob() - 生成一个Blob
4. arrayBuffer() - 生成一个ArrayBuffer
5. formData() - 生成格式化的数据，可用于其他的请求

* 其他方法：

1. clone()
2. Response.error()
3. Response.redirect()

### response.headers

- has(name) (boolean) - 判断是否存在该信息头
- get(name) (String) - 获取信息头的数据
- getAll(name) (Array) - 获取所有头部数据
- set(name, value) - 设置信息头的参数
- append(name, value) - 添加header的内容
- delete(name) - 删除header的信息
- forEach(function(value, name){ ... }, [thisContext]) - 循环读取header的信息

## 使用案例
* GET

```js
fetch('/user').then((res) => {
    return res.text()
  }).then((res) => {
    console.log(res)
  })
```

* POST

```js
fetch('/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'robot',
    code: '198964',
  })
}).then((res) => {
	console.log(res)
})
```

## 封装fetch

```js
/**
 * 将对象转成 a=1&b=2的形式
 * @param obj 对象
 */
function obj2String(obj, arr = [], idx = 0) {
  for (let item in obj) {
    arr[idx++] = [item, obj[item]]
  }
  return new URLSearchParams(arr).toString()
}

/**
 * 真正的请求
 * @param url 请求地址
 * @param options 请求参数
 * @param method 请求方式
 */
function commonFetcdh(url, options, method = 'GET') {
  const searchStr = obj2String(options)
  let initObj = {}
  if (method === 'GET') { // 如果是GET请求，拼接url
    url += '?' + searchStr
    initObj = {
      method: method,
      credentials: 'include'
    }
  } else {
    initObj = {
      method: method,
      credentials: 'include',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: searchStr
    }
  }
  fetch(url, initObj).then((res) => {
    return res.json()
  }).then((res) => {
    return res
  })
}

/**
 * GET请求
 * @param url 请求地址
 * @param options 请求参数
 */
function GET(url, options) {
  return commonFetcdh(url, options, 'GET')
}

/**
 * POST请求
 * @param url 请求地址
 * @param options 请求参数
 */
function POST(url, options) {
  return commonFetcdh(url, options, 'POST')
}
```

```http
GET('https://www.xxxxxx.com/search/error.html', {a:1,b:2})
POST('https://www.xxxxxx.com/search/error.html', {a:1,b:2})
```

## CORS跨域
如果服务器支持 CORS, 则在客户端设置相应的  ``Access-Control-Allow-Origin``  即可得到数据。

```js
let myHeaders = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
});
fetch(url, {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors'
}).then((res) => {
    // TODO 
})
```
