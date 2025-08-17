<template>
  <div class="container" :class="{ 'isExpandable': isExpandable }" @click="isExpanded = !isExpanded">
    <div class="img-container">
      <span class="visit-count">{{ Count }}</span>
      <img :src="src" :alt="name" loading="lazy" />
    </div>
    <div class="text">{{ name }}</div>
    <div class="text">{{ caption }}</div>
    <div class="text time" v-if="start_time">{{ start_time }} 至 {{ end_time }}</div>
    <div class="stars">
      <span class="stars-text">{{ '★'.repeat(stars) }}{{ '☆'.repeat(5 - stars) }}</span>
      <span v-if="isExpandable" class="expand-btn"> {{ isExpanded ? '收起' : '点击展开' }}</span>
    </div>
    <div class="friends-list">
      <span v-for="friend in friends" class="friend-text">{{ friend }}</span>
    </div>
    <transition name="caption-fade">
      <div class="caption" v-if="isExpanded">
        <slot> </slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts" name="showItem">
let props = withDefaults(defineProps<{
  src: string,
  name?: string,
  caption?: string,
  start_time?: string,
  end_time?: string,
  stars: number,
  isExpandable?: number,
  friends?: string[],
  visitCount?: number | string // 新增属性
}>(), {
  name: '',
  isExpandable: 0,
  visitCount: 1
})
import { ref, computed } from 'vue';
let isExpanded = ref(false);
let Count = computed(() => {
  return typeof props.visitCount === 'string' ? props.visitCount : `${props.visitCount}x`;
});

</script>

<style scoped>
.container {
  display: block;
  background-color: transparent;
  padding: 3%;
  border: light-dark(transparent, #929292) 1px solid;
  height: max-content;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  
}

.img-container {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background-color: #CECED6;
  border-radius: 8px;
  width: 100%;
  position: relative;
  /* 关键：让子元素绝对定位 */
}

.visit-count {
  position: absolute;
  top: 8px;
  left: 8px;
  opacity: 0.8;
  background-color: #e5d4ff;
  color: #8a56d8;
  border: #8a56d8 1px solid;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  z-index: 2;
  pointer-events: none;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.container:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.container.isExpandable:hover {
  cursor: pointer;
  border: #8a56d8 1px solid;

}

.text {
  display: flex;
  justify-content: center;
  font-size: 13px;
  margin: 2% 10%;
}

.time {
  font-size: 10px;
}



.stars {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 10px;
  margin-top: 8px;
}

.stars-text {
  color: #f5a623;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  width: max-content;
  pointer-events: none;
}

.caption-fade-enter-active,
.caption-fade-leave-active {
  transition: all 0.3s ease;
}

.caption-fade-enter-from,
.caption-fade-leave-to {
  opacity: 0;
  transform: translateX(-2px);
}

.caption-fade-enter-to,
.caption-fade-leave-from {
  opacity: 1;
  transform: translateX(0px);
}

.caption {
  font-size: 14px;
}


.expand-btn {
  margin-left: auto;
  font-size: 12px;
  color: #8a56d8;
  border: none;
  z-index: 1;
  background: transparent;
}

.friend-text {
  padding: 3px 8px;
  border-radius: 50px;
  background-color: #e5d4ff;
  color: #8a56d8;
  border: #8a56d8 1px solid;
  /* font-weight: bolder; */
  font-size: 12px;
  margin: 2px 5px;
}

.friends-list {
  margin-top: 8px;
  display: flex;
  justify-content: space-evenly;
}
</style>