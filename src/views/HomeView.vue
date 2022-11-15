<template>
  <PageTransition :component="import('@/components/HomeUI/HomeLayout.vue')" :condition-item="[getImages, getCharacters]"
    :error="[getImagesError, getError]" :properties="{ images: getImages }" />
</template>

<script setup lang="ts">
import PageTransition from '@/components/UI/PageTransition.vue';

import { useCharacters } from '@/store/Characters/Characters';
import { useHomeBackgroundImages } from '@/store/Home/HomeBackgroundImages';
import { onMounted } from 'vue';

const { getImages, getImagesError, fetchBackgroundImages } = useHomeBackgroundImages()
const { getCharacters, getError, fetchCharacters } = useCharacters()

onMounted(() => {
  if (!getImages.value) {
    fetchBackgroundImages()
    fetchCharacters()
  }
})

</script>
