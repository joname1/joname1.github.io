title: Vue组件($children,$refs,$parent)的使用
date: 2017-07-13 11:23:54 +0800
update: 2017-07-13 12:00:00 +0800
author: me
tags:
    - Vue
preview: 如果项目很大，组件很多，怎么样才能准确的、快速的寻找到我们想要的组件了？？

---
如果项目很大，组件很多，怎么样才能准确的、快速的寻找到我们想要的组件了？？


#### 1、$refs

首先你的给子组件做标记。
```html
<firstchild ref="one"></firstchild>
```

然后在父组件中，通过this.$refs.one就可以访问了这个自组件了，包括访问自组件的data里面的数据，调用它的函数

#### 2、$children

他返回的是一个组件集合，如果你能清楚的知道子组件的顺序，你也可以使用下标来操作；
```js
for(let i=0;i<this.$children.length;i++){
       console.log(this.$children[i].msg); //输出子组件的msg数据；
 }
```
接下来就来一个点的demo

首先定义一个父组件：parentcomponent，

在父组件中我又是使用了两个自组件（假如有一百个自组件） [明确一点，组件只能有一个根节点 ]，根节点是啥，我不知道。。。。。。
```html
<template id="parentcomponent">
    <div >
        <p>this is a parent-component</p>
        <firstchild  ref="f1"></firstchild>
        <secondchild ref="f2"></secondchild>
        <button @click='show_child_of_parents'>show child msg</button>
    </div>
</template>
```
分别给出两个字组件的定义：（第2个使用的是template,第1个是script）
```html
<script type="text/x-template" id="childOne">
    <div>
        <p>this is first child</p>
      
        //使用stop阻止默认事件（vue的事件处理机制）
        <button @click.stop='getParent'>get parent msg</button>
    </div>
</script>

<template id="childSec">
    <div>
        <p>this is second child</p>
    </div>
</template>
```
组件模板定义好了，就是用：

- 挂在元素：

```js
<script>
    new Vue({
        el:"#app",
        data:{},
        components:{
            "parent-component":{
                template:'#parentcomponent', 
                data(){
                    return{msg:'这是父组件中的内容'}                    
                },
                methods:{
                    show_child_of_parents(){
                        //children方式访问自组件
　　　　　　　　　　　　　　 for(let i=0;i<this.$children.length;i++){
                                console.log(this.$children[i].msg);
                        }
　　　　　　　　　　　　　　　//通过$ref打标记，访问子组件　
                        console.log(this.$refs.f1.msg);
 　　　　　　　　　　　　　　this.$refs.f1.getParent();
                    },                                    
                },    
　　　　　　　　　　     
                components:{
                    'firstchild':{
                        template:'#childOne',
                        data(){
                            return {msg:'这是第一个子组件'};
                        },
                        methods:{
                            getParent(){
                                let a=1;
                                console.log(a);
                                alert(this.$parent.msg);
                                
                            }
                        },
                    },
                    
                    'secondchild':{
                        template:'#childSec',
                        data(){
                            return {msg:"这是第二个组件"};
                        }
                    }
                    
                }
                                
            }
        }
        
    });

</script>
```
- 使用父组件了

```html
    <body>
        <p><strong>可以通过$refs访问父组件的子组件</strong></p>
        <div id="app">
            <parent-component></parent-component>
        </div>
    </body>
```

#### 小结

- 组件只能一个根节点

- 可以在自组件中使用this.$parent.属性值，或者函数

- 在父组件中可以使用this.$refs.组件的标记访问子组件，或者this.$children[i].属性访问子组件

- 你需要注意this的指向