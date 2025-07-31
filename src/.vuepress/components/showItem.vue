<template>
  <div class="container">
    <div class="img-container">

      <img :src="src" :alt="name" loading="lazy" />

    </div>
    <div class="text">{{ name }}</div>
    <div class="text">{{ caption }}</div>
    <div class="text time" v-if="start_time">{{ start_time }} 至 {{ end_time }}</div>
    <div class="stars">
      <span>{{ '★'.repeat(stars) }}{{ '☆'.repeat(5 - stars) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts" name="showItem">
withDefaults(defineProps<{ src: string, name?: string, caption?: string, start_time?: string, end_time?: string, stars:number }>(), {
  name: ''
})
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

.img-container {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background-color: #eee;
  border-radius: 8px;
  width: 100%;
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
  color: #f5a623;
  font-size: 1rem;
  display: flex;
  justify-content: center;
}
</style>