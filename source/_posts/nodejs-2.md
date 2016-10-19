---
title:  Node.js(2) MySQL
date: 2016-10-2 16:22:52
tags: [node.js,nodejs,mysql]
---
MySQL是mysql-5.6.17
nodejs是目前最新版。

# ①安装nodejs的mysql模块
如果你的nodejs的版本比较新的话，应该不存在安装路径问题；
在你想要运行nodejs文件的根路径，启动命令行（shift+鼠标右键）；
输入：
<!-- more -->
``npm install mysql``
 
正常的话，应该出的是一个带树形结构的图，比如这样：
![](http://p1.bpimg.com/567571/8a56c4679605be87.png)

如果差别过大，可能是出问题了，那么新建一个js文件，把以下内容复制粘贴进去
注意修改mysql的账号名、密码，而端口号3306是默认的；
```js
var mysql  = require('mysql');  //调用MySQL模块  
  
//创建一个connection  
var connection = mysql.createConnection({  
    host     : '127.0.0.1',       //主机  
    user     : 'root',               //MySQL认证用户名  
    password : '',        //MySQL认证用户密码  
    port: '3306',                   //端口号  
});  
//创建一个connection  
connection.connect(function(err){  
    if(err){  
        console.log('[query] - :'+err);  
        return;  
    }  
    console.log('[connection connect]  succeed!');  
});  
//执行SQL语句  
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {  
    if (err) {  
        console.log('[query] - :'+err);  
        return;  
    }  
    console.log('The solution is: ', rows[0].solution);  
});  
//关闭connection  
connection.end(function(err){  
    if(err){  
        return;  
    }  
    console.log('[connection end] succeed!');  
});  
```
如果正常运行的话，可以从控制台console.log出来的消息确认（具体请看代码）；

# ②mysql的增add：
假如我想在mysql里，数据库（database）名为test，表名为a_test_table插入数据。
假设你只装了mysql，却不懂mysql，那么这里我推荐你安装mysql-5.6.17-winx64这个版本，这样可以保证代码正常执行。
然后进入mysql，默认账号名为root，默认密码为空；
【以下代码注意结尾的分号，分号表示一条命令的结束】
 
输入showdatabases;
可以查看库名。应该有一个test库，如下图：
![](http://p1.bpimg.com/567571/e7ee7e55bcf03dd5.png)
如果没有的话，请自行搜索如何创建一个库；
然后输入usetest;
进入test表；然后输入show tables;
显示test库下面的所有表，如下图：
![](http://p1.bpimg.com/567571/76a59ac469b33b45.png)

当然，正常来说，你这里应该是空。于是我们需要建表，为了方便，建一个最简单的表，输入以下命令：
create table a_test_table(
id int,
name varchar(20));
创建一个表，他只有两个字段，分别是id（int类型表示数字），name（字符类型）。此时再打show tables;  便可以看到a_test_table这个表了；
再输入elect* from a_test_table;
查询表内容，会显示空：
![](http://img.blog.csdn.net/20160612152004210)

下来开始正文，如何在这个表里插入内容：
首先，新建一个js文件，记得使用utf-8格式。
下面是代码，具体请看注释：
```js
var mysql = require('mysql');  //调用MySQL模块  
  
//创建一个connection  
var connection = mysql.createConnection({  
    host: '127.0.0.1',       //主机地址  
    user: 'root',               //MySQL认证用户名  
    password: '',        //MySQL认证用户密码  
    port: '3306',                   //端口号  
    database: 'test',                //库名  
});  
//创建一个connection，即连接到mysql的对象，如果连接错误，会提示错误。  
connection.connect(function (err) {  
    if (err) {  
        console.log('[query] - :' + err);  
        return;  
    }  
    console.log('[connection connect]  succeed!');  
});  
  
var userAddSql = 'INSERT INTO a_test_table(id, name) VALUES(?,?)';  
/* 
这里实际上是一个mysql语句， 
关键是第三个a_table_test表示表名； 
id和name表示字段名； 
两个问号表示插入的值，如果不是问号，而是一个值，那么表示这个字段固定插入这个值 
*/  
var userAddSql_value = [1, 'wddddd'];       //这里实际依次对应的是上面2个问号，因为id是int，所以第一个是数字，第二个是字符串  
  
connection.query(userAddSql, userAddSql_value, function (err, result) {  
    if (err) {  
        console.log('[INSERT ERROR] - ', err.message);  
        return;  
    }  
  
    console.log('——————————————INSERT————————————————');  
    console.log('INSERT ID: ', result);  
    console.log('—————————————————————————————————');  
})  
  
//关闭connection  
connection.end(function (err) {  
    if (err) {  
        return;  
    }  
    console.log('[connection end] succeed!');  
});  
```
如果显示错误，请检查自己的nodejs代码，一般问题常发生在账号名、密码、库名、表名等。

# ③查select：
有没有发现代码的特点，他的关键是mysql的命令，只要我们更改命令，完全可以像直接在mysql里输入命令行一样操控mysql，例如，我们只需要改这么一段代码：
```js
var userAddSql = 'SELECT * FORM a_test_table';
```
即使完全不动其他代码，那么回调函数也能正常运行，其表现应该是这样：
![](http://img.blog.csdn.net/20160612152125384)
当然，完全不改是不好的，但无论如何，我们需要的功能是实现了。
另外，显而易见，我们需要对返回内容进行操纵，那么首先我们需要明确返回内容是什么？结论是，他是一个数组（从 [] 可以猜出），然后我们这个数组只有一项，因此加上下标[0]，假如我们需要获取name属性，那么就是result[0].name；
总得来说，代码在之前的基础上这么修改：
把
```js
console.log('INSERT ID: ', result);  
```
修改为：
```js
console.log(result[0].name);
```
然后再次执行js文件，显示结果应该是这样：
![](http://img.blog.csdn.net/20160612152225291)

# ④删delete
是不是感觉很简单，让我们Go on
这次我们要删除id=1的那一项（因为id是唯一的，不会删错）——虽然我们其实就一项
在之前代码上继续修改：
```js
var userAddSql = 'DELETE FROM a_test_table WHERE id = 1';  //之所以大写mysql的指令，是为了和数据区分，事实上不大写也是可以的
```
然后执行之；
毫无疑问，代码会报错，但是并非我们删除命令错误了，而是因为之前的代码，会输出结果的name属性，显然咯，都被删除了，哪有name属性；
为了证明我们删除命令并没错，在mysql里进行查询：
![](http://img.blog.csdn.net/20160612152323055)
我们可以发现，我们需要删除的那一项被删除了。

# ⑤改update
增删查改，我们只剩下改了。但是目前mysql表里没内容，我们需要重新加上一些mysql信息。
一次插入多条数据：
```js
var userAddSql_value = [[1, 'a'], [2, 'd']];  
  
for (var i = 0; i < userAddSql_value.length; i++) {  
    connection.query(userAddSql, userAddSql_value[i], function (err, result) {  
        if (err) {  
            console.log('[INSERT ERROR] - ', err.message);  
            return;  
        }  
  
        console.log('——————————————INSERT————————————————');  
        console.log(result[0].name);  
        console.log('—————————————————————————————————');  
    })  
}  
```
然后接下来，我们要修改数据了。
我们这次的目的，是把id=1的项，name修改为pp
需要注意的是，所有id=1的项，name属性都将被修改为pp（而不是仅仅只有一个）；
```js
var userAddSql = 'UPDATE a_test_table SET name = ? WHERE id = ?';    
var userAddSql_value = ["pp", 1];   
connection.query(userAddSql, userAddSql_value, function (err, result) {  
    if (err) {  
        console.log('[INSERT ERROR] - ', err.message);  
        return;  
    }  
  
    console.log('——————————————INSERT————————————————');  
    console.log('INSERT ID: ', result);  
    console.log('—————————————————————————————————');  
})  
```
运行之，然后再查表，正常的话，你会发现，id=1的项，其值被更为为了pp
![](http://img.blog.csdn.net/20160612152440545)

# ⑥断线重连
按照说明，使用连接池的方法更好，不过既然看到了断线重连，虽然挺迷茫，但正常运行了（虽然并不明白，而且感觉有点出入），那就先用着
代码这么写：
```js
var mysql = require('mysql');  //调用MySQL模块  
  
//创建一个connection  
var db_config = mysql.createConnection({  
    host: '127.0.0.1',       //主机地址  
    user: 'root',               //MySQL认证用户名  
    password: '',        //MySQL认证用户密码  
    port: '3306',                   //端口号  
    database: 'test',                //库名  
});  
var connect;  
function handleDisconnect() {  
    connect = mysql.createConnection(db_config);    //创建连接（连接的设置是上面）  
    connect.connect(function (err) {    //大概是指连接，  
        if (err) {  
            console.log("正在连接中：" + new Date());  
            setTimeout(handleDisconnect, 3000);  
            return;  
        }  
        console.log("连接成功");  
        run();  
    })  
    connect.on('error', function (err) {  
        console.log('db error', err);  
        if (err.code === 'PROTOCOL_CONNECTION_SET') {  
            handleDisconnect();  
        } else {  
            throw err;  
        }  
    })  
}  
handleDisconnect();  
function run() {  
    db_config.connect(function (err) {  
        if (err) {  
            console.log('[query] - :' + err);  
            return;  
        }  
        console.log('[connection connect]  succeed!');  
    });  
  
    var userAddSql = 'UPDATE a_test_table SET name = ? WHERE id = ?';  
    var userAddSql_value = ["www", 1];  
  
    db_config.query(userAddSql, userAddSql_value, function (err, result) {  
        if (err) {  
            console.log('[INSERT ERROR] - ', err.message);  
            return;  
        }  
  
        console.log('——————————————INSERT————————————————');  
        console.log('INSERT ID: ', result);  
        console.log('—————————————————————————————————');  
    })  
  
  
//关闭connection  
    db_config.end(function (err) {  
        if (err) {  
            return;  
        }  
        console.log('[connection end] succeed!');  
    });  
}  
```

# ⑦连接池：
然后我试了试连接池的方法：
```js
var mysql = require('mysql');  
var pool = mysql.createPool({  
    host: 'localhost',  
    user: 'root',  
    password: '',  
    database: 'test',  
    debug: false,  
});  
  
var insert = function (connection, data) {  
    connection.query('INSERT INTO a_test_table SET ?', data, function (err, result) {  
        console.log('ID : ' + result.insertId);  
    });  
};  
  
var update = function (connection, data) {  
    connection.query('UPDATE a_test_table SET name = ? WHERE id = ?', data, function (err, result) {  
    });  
};  
  
var select = function (connection) {  
    connection.query('SELECT * FROM a_test_table', function (err, result) {  
        result.forEach(function (user) {  
            console.log(user.id + ':' + user.name + ':');  
        });  
    });  
};  
  
pool.getConnection(function (err, connection) {  
    var data = ['www', 1];  
    select(connection);  
    update(connection, data);  
    select(connection);  
});  
  
console.log('mysql is start!');  
``` 
然后我尝试停用了mysql，运行这段代码，发现，停用后无法连接，并报错；如果是正在连接，那么会自动断掉连接。
 
不是很明白如何断线重连。
 
也许是假如断线了，就运行这个pool.getConnection这句代码？
但是如何判断呢？不清楚
 
像下面这么写么？假如没连上，的确可以尝试重复连接，但是如果连接上的时候，断掉了，却不会继续重连。
```js
function toConnet() {  
    pool.getConnection(function (err, connection) {  
        if (err) {  
            console.log("连接中：" + err);  
            setTimeout(toConnet, 2000);  
        } else {  
            var data = ['bbbb', 1];  
            select(connection);  
            update(connection, data);  
            select(connection);  
        }  
    })  
}  
toConnet();  
```
下面的表示链接成功了
![](http://img.blog.csdn.net/20160612152611657)

# ⑧防止SQL注入：
使用方法：escape()
具体用法是：
不过貌似nodejs本身就带有一定的防注入功能。例如，我把data改为：
```js
var data = ["'bbbb', id = 2", 1];  
```
这样拼接出来的sql代码应该是：
UPDATE a_test_table SET name = 'bbbb', id = 2 WHERE id = 1
运行这个js文件后，会发现结果变成这样：
![](http://img.blog.csdn.net/20160612153243840)
但若在mysql里面运行这段代码：
结果变成这样：
![](http://img.blog.csdn.net/20160612153302712)
说明我们拼接的代码是没错的，只是mysql防止了这种简单的sql注入攻击。