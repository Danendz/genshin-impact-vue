<template>
  <router-view :key="useRoute().fullPath" v-slot="{ Component, route }">
    <Transition name="page" appear>

      <div :key="route.name as string">
        <component :is="Component" />
      </div>

    </Transition>
  </router-view>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { useGlobalLanguage } from './store/globalLanguage';
const { getLanguage, setLanguage } = useGlobalLanguage()

setLanguage(getLanguage.value)
</script>

<style lang="scss">
@import '@/assets/Styles/animations/page';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: #e4dfc9 transparent;
}

body {
  background-color: white;
}

*::-webkit-scrollbar {
  width: 5px;
  height: 8px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: #e4dfc9;
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb:hover {
  cursor: pointer;
}

p,
span,
figcaption,
h1,
h2,
h3,
h4,
h5 {
  font-family: Genshin;
  font-weight: 100;
}
</style>
