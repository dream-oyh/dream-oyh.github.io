<template>
  <h1>MY RECORDS BADGE</h1>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts" name="musicRankList">
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
h1{
  font-family: fantasy;
  display: flex;
  justify-content: center;
}
</style>