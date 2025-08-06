<template>
  <div class="container">

  </div>
</template>

<script setup lang="ts" name="vibeImage">

</script>

<style scoped>
.container {
  column-count: 3;
  column-gap: 10px;
  padding: 3%;

}

img:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  border: solid 1px #8a56d8;
}

img {
  width: 98%;
  display: block;
  margin: 10px 0;
  border-radius: 8px;
  border: solid 1px transparent;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
}
</style>