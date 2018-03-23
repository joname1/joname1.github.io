title: React 组件开发入门
date: 2018-03-18 18:23:54 +0800
update: 2018-03-18 21:00:00 +0800
author: me
tags:
    - React
preview: 熟悉 React 的思想后，我们先来尝试开发一个单纯的小组件，可以对比一下是不是比以前的开发模式更加舒适了。

---
熟悉 React 的思想后，我们先来尝试开发一个单纯的小组件，可以对比一下是不是比以前的开发模式更加舒适了，这里我主要以一个 Loading 组件来举栗子，实现了几个基本的功能：

* 一种类型的 loading（菊花转）
* 能够设置 loading 的三个属性：width height color
* 能够控制 loading 的显示和隐藏

其实对于一个简单需求来说，这三个属性已经很实用了。但是去网上看一些外国大神写的组件，有一些不明白的地方，所以自己就慢慢搞，do it！

#### 设计
我想这样用 loadding 组件：
```js
var loadingClasses = cx({
	loadding: true,
	active: this.state.isActiveLoading
	});

	<Loading width={30} height={30} color={#000} className={loadingClasses} />
```
所以我定义这个组件的基本结构如下：
```js
var Loading = React.createClass({
    // 控制组件属性的类型
    propTypes: {},
    // 控制组件属性的默认值
    getDefaultProps: function () {},
    // 组装基本的内联样式
    getComponentStyle: function () {},
    // 渲染基本的组件，拆分 render 方法的粒度
    renderBaseComp: function () {},
    // 最终的渲染方法
    render: function () {}
});
```
这个组件中，我使用的 内联样式 来控制组件的内部基本样式的稳定。其实有时候我们会觉得内联样式不好，但是我个人觉得每一种设置 CSS 形式的方法，用在合适的场景中就是正确的。

每部分的具体实现如下，代码中有一些讲解（这里我不会介绍具体 loading 效果是怎么出来的，看代码应该就会明白，主要介绍一个 react 制作简单组件的思路和写法）对于扩展性来说，
```
你还可以加入 className 和 type 这些修饰性的属性，但是我更倾向于迭代式的组件开发，
小组件就要具有良好的封闭性，使用接口简单。大组件才考虑更好的鲁棒性和可扩展性，
这样开发一个组件的性价比才高。需要注意对 getDefaultProps的理解，
只有当使用接口的人代码中根本没有写那个属性的时候，才会使用定义的默认值。
```

#### 实现
```js
var Loading = React.createClass({
    propTypes: {
        width: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        height: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        color: React.PropTypes.string,
        active: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            color: "#00be9c",
            height: 30,
            width: 30,
            active: false
        };
    },

    getComponentStyle: function() {
        var width = this.props.width,
            height = this.props.height,
            color = this.props.color;
        /* 中间圆心 */
        var cWidth = 0.4 * width,
            cHeight = 0.4 * height,
            cMarginLeft = -0.5 * cWidth,
            cMarginTop = -0.5 * cHeight;

        /* 基本样式 */
        return {
            loadingStyle: { // loadding 容器
                width: width,
                height: height
            },
            lineStyle: { // loadding 元件样式
                background: color
            },
            centerStyle: { // loadding 圆心样式
                width: cWidth,
                height: cHeight,
                marginLeft: cMarginLeft,
                marginTop: cMarginTop
            }
        };
    },

    renderBaseComp: function(compStyle) {
        /* 生成动画元件 */
        var n = 4; // 元件个数，todo: 定制个数
        var lines = []; // 元件元素集合
        for (var i = 0; i < n; i++) {
            lines.push(
                <div className="line">
                    <span className="top" style={ compStyle.lineStyle }></span>
                    <span className="bottom" style={ compStyle.lineStyle }></span>
                </div>
            );
        }
        return lines;
    },

    render: function() {
        /* 生成组件自己的样式 */
        var compStyle = this.getComponentStyle();
        /* 模拟渲染基本动画元件 */
        var lines = this.renderBaseComp(compStyle);

        // loadding 的class，控制交互
        var loadingClasses = cx({
            loading: true,
            active: this.props.active
        });

        return (
            <div className={ loadingClasses } style={ compStyle.loadingStyle }>
                {lines}
                <div className="loading-center" style={ compStyle.centerStyle }></div>
            </div>

        );
    }

});
```

##### 最后，下面是基本的 SASS（不考虑不支持的情况，不支持都不用开发，直接用图，性价比更高）

```css
@include keyframes(load) {
    0% {
        opacity: 0;
    }
    25% {
        opacity: .25;
    }
    50% {
        opacity: .5;
    }
    75% {
        opacity: .75;
    }
    100% {
        opacity: 1;
    }
}

.loading {
    display: none;
    position: absolute;
    &.active {
        display: block;
    }
    .loading-center {
        position: absolute;
        left: 0;
        top: 50%;
        background: #fff;
        border-radius: 50%;
    }
    .line {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        .top {
            content: "";
            display: block;
            width: 1px;
            font-size: 0;
            height: 50%;
        }
        .bottom {
            @extend .top;
        }
        @for $i from 1 through 4 {
            &:nth-child(#{$i}) {
                transform:rotate(45deg * ($i - 1));
                .top {
                    @include animation(load, 0.8s, linear, 0s, infinite);
                }
                .bottom {
                    @include animation(load, 0.8s, linear, 0.4s + $i/10, infinite);
                }
            }
        }
    }
}
```
里面用到的一个 animation 混淆方法：
```css
@mixin keyframes($name) {
    @-webkit-keyframes #{$name} {
        @content;
    }
    @-moz-keyframes #{$name} {
        @content;
    }
    @-ms-keyframes #{$name} {
        @content;
    }
    @keyframes #{$name} {
        @content;
    }
}

@mixin animation ($name, $duration, $func, $delay, $count, $direction: normal) {
    -webkit-animation: $name $duration $func $delay $count $direction;
    -moz-animation: $name $duration $func $delay $count $direction;
    -o-animation: $name $duration $func $delay $count $direction;
    animation: $name $duration $func $delay $count $direction;
}
```