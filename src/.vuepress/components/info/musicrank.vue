<template>

  <div class="container">

    <div class="album-cover">
      <img :src="album_cover_url" alt="Album Cover" />
    </div>
    <div class="color-cover"></div>
    <div class="number">{{ rank }}</div>
    <div class="album-logo">
      <img v-if="album_logo_url" :src="album_logo_url" alt="">
      <div v-if="album_name" class="album_name">{{ album_name }} </div>
    </div>

  </div>
</template>

<script setup lang="ts" name="musicrank">

import { computed } from 'vue';
interface RgbColor {
  r: number;
  g: number;
  b: number;
}


let props = withDefaults(defineProps<{
  baseColor?: RgbColor; // Prop to receive the base color
  album_cover_url: string; // URL of the album cover image
  album_logo_url?: string; // Optional URL for the album logo
  album_name?: string;
  rank: number;
  logo_scale: number;
}>(), {
  // Default to the original pink color
  baseColor: () => ({ r: 251, g: 179, b: 209 }),
  logo_scale: 0.8,
});



const gradientBackground = computed(() => {
  // Destructure the r, g, b values from the prop
  const { r, g, b } = props.baseColor;

  // Construct the two rgba strings based on the prop
  const opaqueColor = `rgba(${r}, ${g}, ${b}, 1)`;
  const transparentColor = `rgba(${r}, ${g}, ${b}, 0)`;

  // Return the complete linear-gradient string
  return `linear-gradient(to right, ${opaqueColor} 48%, ${transparentColor})`;
});
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 150px;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.album-cover {
  position: absolute;
  /* 3. 将图片的右边缘固定在容器的右边缘 */
  right: 0;
  /* (可选) 如果需要同时垂直居中 */
  top: 50%;
  transform: translate(15%, -50%) scale(0.8);
  z-index: 1;
}

.color-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  background: v-bind('gradientBackground');
  z-index: 2;
}

.number {
  position: absolute;
  top: -20%;
  left: 0;
  font-size: 13rem;
  font-weight: bold;
  color: #fff;
  opacity: 0.8;
  z-index: 3;

}

.album-logo {
  position: absolute;
  /* top: v-bind('props.logo_pos.y');
  left: v-bind('props.logo_pos.x');
  width: v-bind('props.logo_pos.width'); */
  /* 3. 将图片的左上角移动到容器的中心点 */
  top: 50%;
  left: 50%;

  /* 
    4. 使用 transform 将图片向左、向上回移自身宽高的一半，
       从而使其几何中心与容器中心对齐。
  */
  transform: translate(-40%, -50%) scale(v-bind('props.logo_scale'));

  /* (可选) 防止图片过大溢出容器 */
  /* max-width: 100%;
  max-height: 100%; */
  z-index: 4;


}

.album_name{

    font-size: 25px;
  font-weight: bolder;
  color: #fff;
  opacity: 0.7;
}

* {
  user-select: none;
}
</style>