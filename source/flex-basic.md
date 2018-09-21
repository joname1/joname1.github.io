title: Flex基础布局详解
date: 2017-09-19 18:23:54 +0800
update: 2017-09-19 21:00:00 +0800
author: me
tags:
    - Flex
    - CSS
preview: 使用弹性盒子的意义是在任何尺寸的屏幕上改变其和其子元素的尺寸填充屏幕可用空间。一个弹性框容器将延展它的子元素以填充可用空间，并且缩小它的子元素来避免溢出。

---
# flex属性
一个flex布局的页面所具有的元素可分为2类。

* 1.弹性容器
* 2.弹性元素（包含在弹性容器内的元素）

## 弹性容器
弹性容器拥有横轴(main)和纵轴(cross)2种方向来决定着整体flex布局的流向，默认布局：横轴从左(main start)到右(main end)，纵轴从上(cross start)到下(cross end)

![](https://sfault-image.b0.upaiyun.com/134/028/1340284239-58c253c58c759_articlex)

* flex-direction

> 指定了内部元素是如何在 flex 容器中布局的，定义了主轴的方向(正方向或反方向)。

row：默认，保持原布局不变，按照横轴方向布局，即从左(main start)到右(main end)

row-reverse：按照横方向布局，置换横默认方向，即从右(main end)到左(main start)

column： 按照纵轴默认方向布局，即从上(cross start)到下(cross end)

column-reverse：按照纵轴方向布局，置换纵轴默认方向，即从下(cross start)到上(cross end)

![](https://sfault-image.b0.upaiyun.com/622/085/622085148-58c24de3a0d99_articlex)

``注：flex-direction的值即为整个flex布局的主轴，flex-direction:row | row-reverse则于横轴为主轴，flex-direction:column | column-reverse则于纵轴为主轴，另外的为侧轴``

* flex-wrap

> 指定 flex 元素单行显示还是多行显示 。如果允许换行，这个属性允许你控制行的堆叠方向

nowrap： 默认，单行显示，假如宽度溢出，则自动压缩相应元素的宽度（压缩比例与flex-shrink相关），保持单行。

wrap： 多行显示，假如宽度溢出，自动换行。

wrap-reverse：多行显示，置换侧轴的方向。

![](https://sfault-image.b0.upaiyun.com/363/850/3638502166-58c24eef71680_articlex)

* flex-flow

> flex-direction 和 flex-wrap 的简写

```css
.class{
    flex-flow: column-reverse wrap;/*默认属性*/
}
```

* justify-content

> 属性定义弹性元素在主轴方向的排列

flex-start： 默认值，按照主轴方向进行排列

flex-end： 置换主轴方向进行排列

center： 向中点居中排列

space-between： 在主轴上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素与行首对齐，每行最后一个元素与行尾对齐。

space-around：在主轴上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素到行首的距离和每行最后一个元素到行尾的距离将会是相邻元素之间距离的一半。

![](https://sfault-image.b0.upaiyun.com/348/615/3486154553-58c24f36cebc7_articlex)

* align-items

> 属性定义了弹性元素在侧轴方向的排列

flex-start： 默认值，按照侧轴方向排列

flex-end： 置换侧轴方向进行排列，主轴不变

center： 向中点居中排列

baseline： 所有元素向基线对齐。侧轴起点到元素基线距离最大的元素将会于侧轴起点对齐以确定基线(不是很明白，MDN上面的解释)

stretch：拉伸弹性元素，填充侧轴空间

![](https://sfault-image.b0.upaiyun.com/262/251/2622514220-58c24f56a61c0_articlex)

* align-content

> 属性定义了当弹性元素超过一行时，元素在纵轴上的排列方式

flex-start： 默认值，紧贴前一行，第一行紧贴边缘，与主轴排列方式有关

flex-end： 置换侧轴方向进行排列，紧贴前一行

center： 向中点居中排列，紧贴前一行

space-between： 所有行在容器中平均分布。相邻两行间距相等。容器的垂直轴起点边和终点边分别与第一行和最后一行的边对齐

space-around：所有行在容器中平均分布，相邻两行间距相等。容器的垂直轴起点边和终点边分别与第一行和最后一行的距离是相邻两行间距的一半

stretch：平均分配侧轴空间，相邻行间距相等

![](https://sfault-image.b0.upaiyun.com/174/364/1743644599-58c24f6beed1f_articlex)

## 弹性元素
包含在弹性容器里的每个节点都可以称为弹性元素，相应的，弹性元素也有自身的CSS属性

* order

> 弹性元素根据自身order的值来进行排序

![](https://sfault-image.b0.upaiyun.com/178/889/1788892906-58c24f83de31c_articlex)

* align-self

> 属性和左右与align-items相同，但由于是直接作用在弹性元素上面，优先级比align-items高

![](https://sfault-image.b0.upaiyun.com/336/214/3362144820-58c24fa3663e5_articlex)

* flex-grow

> 定义弹性元素侧轴拉伸因子

![](https://sfault-image.b0.upaiyun.com/256/359/256359781-58c24fb4858a3_articlex)

* flex-shrink

> 与flex-grow相反，定义弹性元素的压缩比例，当弹性元素的总长度超过容器长度时，各自的压缩率(默认是1)

![](https://sfault-image.b0.upaiyun.com/257/534/2575344999-58c24fc86313f_articlex)

* flex-basis

> 用来代替width，优先级比width高（如果flex-basis和width有一个值为auto，那么另外一个非auto优先级更高）

![](https://sfault-image.b0.upaiyun.com/206/563/2065634934-58c24fdb4953c_articlex)

* flex

> flex-grow、flex-shrink、flex-basis的缩写

```css
.flex1{
    flex:none;
    /*
    相当于
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
    */
}

.flex2{
    flex:1;
    /*
    相当于
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: auto;
    */
}

.flex3{
    flex: 1 30px;
    /*
    相当于
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 30px;
    */
}
```
