<!-- src/components/Typewriter.vue -->
<template>
  <div class="typewriter-container">
    <div class="typer" ref="typedElement"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps } from 'vue';
import Typed from 'typed.js';


// 用于引用 DOM 元素的 ref
const typedElement = ref(null);
// 用于存放 Typed 实例
let typedInstance = null;

onMounted(() => {
  // 确保 DOM 元素已经挂载
  if (typedElement.value) {
    // Typed.js 的配置对象
    const options = {
      strings: [
        "Love you to the moon and to Saturn\r\n Passed down like folk songs",
        "The best people in life are free",
        "I was enchanted to meet you",
      ],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      shuffle: true,
      cursorChar: '|',
    };

    // 初始化 Typed 实例
    typedInstance = new Typed(typedElement.value, options);
  }
});

onUnmounted(() => {
  // 在组件销毁时，销毁 Typed 实例以防止内存泄漏
  if (typedInstance) {
    typedInstance.destroy();
  }
});
</script>

<style scoped>
/* 你可以为打字效果添加一些基本的样式 */
.typewriter-container {
  display: flex;
  justify-content: center;
  font-size: 18px;
  margin: 50px 20px;
}

.typer {
  font-family: 'Times New Roman', Times, serif;
  color: #8a56d8;
}

@keyframes typedjsBlink {
  50% {
    opacity: 0.0;
  }
}
</style>