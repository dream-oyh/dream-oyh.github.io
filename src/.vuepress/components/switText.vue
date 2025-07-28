<template>

  <div class="container" :class="{ 'toggled-state': !text1_status }" @click="toggleText" >
    <div v-if="text1_status" :title="text2">{{ text1 }}</div>
    <div v-else :title="text1">{{ text2 }}</div>
  </div>

</template>

<script setup lang="ts" name="switText">
defineProps<{
  text1: string,
  text2: string
}>()
import { ref } from 'vue';

let text1_status = ref(true)
function toggleText() {
  text1_status.value = !text1_status.value
}

</script>

<style scoped>
.container {

  display: inline-block;

  background-color: #8a56d8;
  min-width: 20px;
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.container.toggled-state {
  /* 点击后的背景色（蓝色） */
  background-color: #3a86b8; /* 这是一个示例蓝色，你可以换成你想要的 */
}

.container div {
  color: white;
  font-weight: bolder;

}


</style>