<template>
  <div class="filter" for="select">
    <p class="filter-text">{{ filter_text }}</p>
    <p class="filter-value">{{ selectedValue }}</p>
    <select name="select" id="select" v-model="selectedValue">
      <option v-for="kv in key_value" :key="kv.Key" :value="kv.Value">{{ kv.Key }}</option>
    </select>

  </div>
</template>

<script setup lang="ts" name="Select">
import { computed } from 'vue';

type KeyValue = {
  Key: string | number,
  Value: string | number
}

let props = defineProps<{ filter_text: string, key_value: KeyValue[], modelValue: string | number }>()
let emit = defineEmits(['update:modelValue'])
const selectedValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})
</script>

<style scoped>
.filter {
  display: flex;
  justify-content: space-evenly;
}

.filter {
  border-style: solid;
  border-width: 2px;
  border-color: #6c3ab8;
  padding: 5px 15px 5px 15px;
  border-radius: 1000px;
  position: relative;
  background-color: transparent;
  cursor: pointer;
  /* 让整个区域显示为可点击手势 */
  font-family: sans-serif;
}

.filter::after {
  content: '▼';
  /* 你也可以使用SVG或图片 */
  font-size: 12px;
  color: #555;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  /* 关键：让箭头不捕获鼠标事件，这样点击事件才能“穿透”到下面的select上 */
}

.filter-value {
  margin-top: 0px;
  margin-bottom: 0px;
  display: block;
  padding: 0px 15px 0px 0px;
  /* 右边留出空间给箭头 */
  color: light-dark(#333, #eee);
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
}

.filter select {
  /* 视觉上隐藏 */
  opacity: 0;
  /* 关键：让它覆盖整个父容器 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 移除浏览器默认外观 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /* 确保在所有设备上都是可点击的 */
  cursor: pointer;
  border: none;
  /* 移除边框 */
  background: transparent;
  /* 移除背景 */
}

.filter-text {
  margin: 0px 0px 0px 0px;
}
</style>