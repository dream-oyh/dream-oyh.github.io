---
Date: 2025-07-29
icon: css
---

# CSS

我没有系统学过 css，是在 Vue 的开发中摸打滚爬地学着 css 写法的，也是学的最基础的 css，没有学太多其他写法。

## 容器基础属性设置

- <switText text1="background-color" text2="背景颜色"/>
- <switText text1="padding" text2="内边距"/> 可以填 1/2/4 个参数。
  可以用`padding-top/right/bottom/left`单独设置某一边的内边距
  - 填 1 个参数代表四周均按照 padding 值作为内边距
  - 2 个参数分别按顺序代表上下和左右
  - 4 个参数分别按顺序代表上右下左
- <switText text1="margin" text2="外边距"/>  
  容器对外边距，与padding同理。

## 布局方式

每一个组件都有对内和对外的布局方式。css 用 `display` 参数指定布局方式。

- <switText text1="block" text2="块状布局"/> 
  `div`容器默认是块状布局，块状布局要求组件竖向排列，而不能横向排列
- <switText text1="inline" text2="行内布局"/> 
  `p`, `span` 等文字属性标签默认是行内布局，可以横向排列
- <switText text1="flex" text2="弹性盒布局"/> 
  任何一个容器都可以指定为 Flex 布局。容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis），是现在用得比较多的属性，可以根据`justify-content`和`align-items`两个属性设置弹性盒内主轴和副轴的对齐方式
- <switText text1="inline-block" text2="组合式布局"/> 
  前者规定了该标签对外显示出 inline 布局属性，而内部元素按照 block 元素进行排列，同理也有 inline-flex 等
- <switText text1="grid" text2="网格布局"/> 
  网格布局顾名思义，可以用`grid-template-columns`和`grid-template-rows`指定表格列数，一般可以写成`repeat(auto-fill, minmax(180px, 1fr))`，表示由页面自动确定排列个数，但是其中组件的最小宽度不低于 180px，最大不超过一列的宽度。
  - `gap` 属性能够定义网格布局内元素之间的间距

## 常用基础组件设置

### 容器

本博客内的组件采用近乎一致的容器设置，写法如下。可以实现鼠标悬停时，容器组件上浮的效果。

类似于这样：

<showItem src="/images/travel/深圳.jpg" caption="深圳行" style="width: 400px; height: 320px"/>

```ts
<template>
  <div class="container">
    
  </div>
</template>

<script setup lang="ts" name="xxx">

</script>

<style scoped>
.container {
  display: block;
  background-color: #fff;
  padding: 3%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

}

.container:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

</style>
```
