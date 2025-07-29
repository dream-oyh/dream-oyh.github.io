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

## 组件通信

### props

可以通过`defineProps()`实现父传子和子传父。

```ts
defineProps<{ para1: string; para2: Function }>();
```

其中`para1`用于父组件向子组件传递参数，`para2`是父组件向子组件传递函数句柄，然后子组件通过按钮或其他方式调用这个函数，来达到子向父的通信。该函数在父组件中定义，本质也是父传子。

### 自定义事件

可以实现子传父。父组件中调用：

```html
<template>
  <Child @custom-event="eventFunction" />
</template>

<script setup lang="ts" name="Father">
  import Child from "./Child.vue";
  import { ref } from "vue";
  let receiveData = ref("");
  function eventFunction(value: string) {
    //...
  }
</script>
```

这里的`@custom-event`是自定义事件，类似于 button 按钮中的`@click="()=>{}"`.子组件中用`defineEmits`接收事件。**自定义事件的命名一般用 kebab-case 命名法。**

```ts
<template>
    <div class="child">
        <button @click="emit('custom-event', param)">测试</button>
    </div>
</template>

<script setup lang="ts" name="Child">
import { ref } from 'vue';
let param = ref('')
// 声明事件
const emit = defineEmits(['custom-event'])
</script>
```

### mitt

安装：`pnpm i mitt`

需要在`utils`文件夹下建立`emitter.ts`文件，在这里面写 mitt 的配置。mitt 用于创建公共事件，组件在触发这个公共事件时，调用相关函数，完成信息传递。可以实现任意组件通信。

提供数据的组件触发事件（发布消息），接收数据的组件绑定事件（订阅消息）

```ts
// 引入mitt
import mitt from "mitt";

// 调用mitt得到emitter，emitter能：绑定事件、触发事件
const emitter = mitt();

// 绑定事件
emitter.on("test1", () => {
  console.log("test1被调用了");
});
emitter.on("test2", () => {
  console.log("test2被调用了");
});

// 触发事件
setInterval(() => {
  emitter.emit("test1");
  emitter.emit("test2");
}, 1000);
// 解绑事件
setTimeout(() => {
  // emitter.off('test1')
  // emitter.off('test2')
  emitter.all.clear();
}, 3000);

// 暴露emitter
export default emitter;
```

注意：使用 mitt 的时候，需要在组件卸载时调用`onUnmounted()`解绑事件，对内存不太友好。

### v-model 双向绑定

用于有用户交互的组件上。用户通过组件输入的值和组件本身绑定的值，二者之间双向绑定，会同时更新。给组件传入`v-model`参数，参数内填写值的存储变量，需要是响应式数据。

### $attrs

祖->孙通信

子组件中调用：

```ts
<Child v-bind="$attrs"/>
```

就能把父给子的组件全部穿透至孙组件，然后用`props`接收。

