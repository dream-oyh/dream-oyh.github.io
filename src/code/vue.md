---
Date: 2025-06-28
icon: vuejs-fill
---

# Vue3

野生前端人想尝试着学 vue，给博客里写一些好玩的组件~

[Vue3 语法课](https://www.bilibili.com/video/BV1Za4y1r7KE)

## 项目创建

```bash
npm create vue@latest
```

## .vue 文件组成

### template

这里面写 html 语法，构建 vue 组件的基本结构。

- 参数前加`:`，是`v-bind`的简化调用，用于进行表达式调用，比如`:name = "person.name"`参数后的引号内可以写具体的表达式
- `<li v-for="element in groups" key="element">{{element}}</li>` v-for 用于循环调用，里面的表达式应该写成`xx in xxx`；`v-for`和`key`应该绑定出现，key 为每个循环的元素提供了独一无二的标识。
- `v-model=""` 引号内可以写表达式，用于和 script 中的数据做双向绑定。

### script

这里面写 ts 脚本，存储数据和方法。写成`<script setup lang="ts">`指明用`ts`语言，`setup`是语法糖.

### style

存放 css 样式。写成`<style scoped>`否则会导致样式穿透

## vue 类型与方法

以下方法使用前要先`import`

```ts
import { ref, reactive, toRefs, computed } from "vue";
```

### ref

对基本数据类型和对象类型的响应式函数。引用值的时候需要加`.value`。对于对象类型数据，先对对象名加`.value`，再读取深层数据

### reactive

reactive 只能包裹对象类型数据，会将所包裹对象修改为 Proxy。对象内的深层数据也会被修改为响应式数据，调用数据时不需要加`.value`

reactive 定义的对象不能直接全部修改，需要用`Object.assign()`函数

### toRefs

用于解构 reavtive 包裹的响应式对象，把对象里的每一个参数都改为响应式 ref 数据，且是双向绑定。

```ts{7,11,12}
<script setup lang="ts">
import { toRefs, reactive } from "vue";
let Persons = reactive({
  name: "zhangsan",
  age: 18,
});
let { name, age } = toRefs(Persons);
// 此时，name和age均为ref的响应式数据

function changePerson() {
  name.value = "lisi";
  age.value += 1;
}
// 双向绑定，对name和age修改完之后，Persons.name 和 Persons.age 也一起发生改变
</script>
```

### computed

`computed()`接受一个箭头函数。写法如下，`ans`接受 computed 计算出来的结果。

- `computed()`本就已经是一个 ref 响应式数据
- 可用于追踪数据变化，参与`computed()`计算的数据一旦发生改变，则`computed()`定义的数据就会重新计算

```ts
// 只读的计算属性写法
let ans = computed(() => {
  return xxx;
});

// 可读可写，需要单独配置get 和 set方法
// get需要有返回值，set是在ans被赋值时需要采取的操作，被赋予的值会作为val传入set()
let ans = computed({
  get() {
    return xxx;
  },
  set(val) {},
});
```

### watch

监视的值：

1. `ref`定义的数据
2. `reactive`定义的数据
3. 函数返回一个值（`getter`函数：能返回一个值的函数）
4. 一个包含上述内容的数组

watch 要指明监视的是哪个值，但是`watchEffect()`不用，直接在里面写条件即可，感觉会更方便一点。
