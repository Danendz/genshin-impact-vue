<template>
	<main class="home-menu">
		<HomeBackground :images="props.images" />
		<HomeMenuOptions />
		<HomeMain />
	</main>
</template>


<script setup lang="ts">
//components
import HomeMenuOptions from './HomeMenuOptions/HomeMenuOptions.vue';
import HomeMain from './HomeMain/HomeMain.vue'
import HomeBackground from './HomeBackground/HomeBackground.vue'

interface Props {
	images: string[] | null
}

const props = defineProps<Props>()

</script> 


<style lang="scss">
@import '@/assets/Styles/animations';

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