<template>
	<HomeBackground :images="props.images" />

	<main class="home-menu">
		<HomeMenuOptions :animation-postfix="animationOrientation" />
		<HomeMain :animation-postfix="animationOrientation" />
	</main>
</template>


<script setup lang="ts">
//components
import HomeMenuOptions from './HomeMenuOptions/HomeMenuOptions.vue';
import HomeMain from './HomeMain/HomeMain.vue'
import HomeBackground from './HomeBackground/HomeBackground.vue'

//vue
import { ref, onMounted, watch } from 'vue';
import { useScreenOrientation } from '@vueuse/core';

interface Props {
	images: string[] | null
}

const props = defineProps<Props>()
const { orientation } = useScreenOrientation()

const animationOrientation = ref<'landscape' | 'portrait'>('landscape')

const setAnimationOrientation = () => {
	if (orientation.value === 'landscape-primary') {
		animationOrientation.value = 'landscape'
	} else {
		animationOrientation.value = 'portrait'
	}
}

onMounted(() => {
	setAnimationOrientation()
})

watch(orientation, () => {
	setAnimationOrientation()
})

</script> 


<style lang="scss">
@import '@/assets/Styles/animations';
@import '@/assets/Styles/HomeUI/animations';

.home-menu {
	display: flex;
	height: 100vh;
}

@media only screen and (orientation: portrait) {
	.home-menu {
		flex-direction: column-reverse;
	}
}
</style>