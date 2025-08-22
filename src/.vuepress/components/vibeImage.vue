<template>
  <div class="image-gallery">
    <div v-for="(vnode, index) in images" :key="index" class="image-container">
      <component :is="vnode" />
      <div class="overlay">
        <div class="text">{{ getAltText(vnode) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="vibeImage">
import { useSlots } from 'vue';


const slots = useSlots();
// 过滤掉非法的 VNode，只保留图片
const images = slots.default ? slots.default().filter(vnode => vnode.type === 'img') : [];

const getAltText = (vnode) => {
  return vnode.props ? vnode.props.alt : '';
};

</script>

<style scoped>
/* .image-gallery {
  column-count: 3;
  column-gap: 10px;
  padding: 3%;

} */

.image-gallery {
  display: flex;
  flex-direction: column;
  height: 700px;
  gap: 11px;
  /* padding: 11px; */
  flex-wrap: wrap;
}




.image-container:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  border: solid 1px #8a56d8;
  overflow: hidden;
}


.image-container {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  width: 33%;
  display: block;
  margin: 5px 0;
  border-radius: 8px;
  border: solid 1px transparent;
  border-radius: 8x;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
}

.image-container:nth-child(3n+1) {
  order: 1;
}

.image-container:nth-child(3n+2) {
  order: 2;
}

.image-container:nth-child(3n) {
  order: 1;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  overflow: hidden;
  width: 100%;
  height: 0;
  transition: .5s ease;
  display: flex;
  align-items: center;
  justify-content: start;
}

.image-container:hover .overlay {
  height: 40px;
}

.text {
  color: white;
  font-size: 14px;
  text-align: left;
  padding: 10px;
}
</style>