<template>

  <div v-for="provinceList in travelSites">
    <h2>{{ provinceList.province }}</h2>
    <div class="trave_container">
      <showItem v-for="site in provinceList.siteList" :src="site.imgUrl" :name="site.name"
        :start_time="site.start_time" :end_time="site.end_time" :caption="site.caption" :stars="site.stars" />
    </div>

  </div>
</template>

<script setup lang="ts" name="travelGrid">
import travelSites from "../data/travel"
import showItem from "./showItem.vue";
</script>

<style scoped>
.trave_container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  padding: 0%;
  border-radius: 8px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); */
}
</style>