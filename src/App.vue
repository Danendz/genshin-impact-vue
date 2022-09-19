<template>
  <NavBar />
  <router-view :key="useRoute().fullPath" />
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { useRoute } from 'vue-router';
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  background-color: #dfdcd1;
}
</style>
