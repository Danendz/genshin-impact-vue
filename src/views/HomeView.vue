<template>
  <PageTransition :condition-item="[getImages, getCharacters]" :error="[getImagesError, getError]"
    :loader-title="'Меню'">
    <HomeLayout :images="getImages" />
  </PageTransition>
</template>

<script setup lang="ts">
import PageTransition from '@/components/UI/PageTransition.vue';
import { useCharacters } from '@/store/Characters/Characters';
import { useHomeBackgroundImages } from '@/store/Home/HomeBackgroundImages';
import { onMounted, defineAsyncComponent } from 'vue';

const HomeLayout = defineAsyncComponent(() => import('@/components/HomeUI/HomeLayout.vue'))
const { getImages, getImagesError, fetchBackgroundImages } = useHomeBackgroundImages()
const { getCharacters, getError, fetchCharacters } = useCharacters()

onMounted(() => {
  if (!getImages.value) {
    fetchBackgroundImages()
    fetchCharacters()
  }
})

</script>
