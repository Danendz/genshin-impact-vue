<template>
  <PageTransition :condition-item="[images]" :error="[error]" :loader-title="'Меню'">
    <HomeLayout :images="images" />
  </PageTransition>
</template>

<script setup lang="ts">
import PageTransition from '@/components/UI/PageTransition.vue';
import HomeService from '@/API/HomeService';
import { onMounted, ref, defineAsyncComponent } from 'vue';
import HomeHelper from '@/helpers/HomeHelper';

const error = ref<string | null>(null)
const images = ref<string[] | null>(null)
const homeService = new HomeService()

const HomeLayout = defineAsyncComponent(() => import('@/components/HomeUI/HomeLayout.vue'))

onMounted(() => {
  fetchBackgroundImages()
})

const fetchBackgroundImages = async () => {
  const data = await homeService.getWithAdditionalUrl<string[]>('home-backgrounds/list')

  if (typeof data === 'string') {
    error.value = data
  } else {
    images.value = data.map((name) => HomeHelper.getHomeBackground(name));
  }
  console.log(data)
}

</script>
