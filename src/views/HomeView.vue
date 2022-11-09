<template>
  <PageTransition :condition-item="[getImages]" :error="[getImagesError]" :loader-title="'Меню'">
    <HomeLayout :images="getImages" />
  </PageTransition>
</template>

<script setup lang="ts">
import PageTransition from '@/components/UI/PageTransition.vue';
import { useHomeBackgroundImages } from '@/store/Home/HomeBackgroundImages';
import { onMounted, defineAsyncComponent } from 'vue';

const HomeLayout = defineAsyncComponent(() => import('@/components/HomeUI/HomeLayout.vue'))
const { getImages, getImagesError, fetchBackgroundImages } = useHomeBackgroundImages()

onMounted(() => {
  if (!getImages.value) {
    fetchBackgroundImages()
  }
})

</script>
