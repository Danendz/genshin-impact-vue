<template>
	<Transition name="fade-background" mode="in-out" appear>
		<div v-if="currentImage !== null" class="home-background" :key="currentImage"
			:style="{ backgroundImage: `url(${currentImage})` }"></div>
	</Transition>
</template>


<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import usePreloadImage from '@/Composables/usePreloadImage';

interface Props {
	images: string[] | null;
}
const props = defineProps<Props>()

/* const images = [
	CharacterHelper.getCharacterImage('sucrose', CharacterImage.NAMECARD_HQ),
	CharacterHelper.getCharacterImage('raiden', CharacterImage.NAMECARD_HQ),
	CharacterHelper.getCharacterImage('diona', CharacterImage.NAMECARD_HQ),
	CharacterHelper.getCharacterImage('eula', CharacterImage.NAMECARD_HQ),
] */

const currentImage = ref<null | string>(null)

const [bgImage, loadBgImage] = usePreloadImage()

let timeout: number;

watch(bgImage, () => {
	if (bgImage) {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			currentImage.value = bgImage.value
			startPreloadingImage()
		}, 8000);
	}

})

onMounted(() => {
	if (props.images && props.images.length) {
		currentImage.value = props.images[0]
		startPreloadingImage()
	}
})

const startPreloadingImage = () => {
	const image = chooseRandomImage()

	loadBgImage(image)
}

const chooseRandomImage = (): string => {
	if (!props.images || !props.images.length) throw new Error('no images');
	let randomNum: number = Math.round(Math.random() * (props.images.length - 1))

	if (props.images[randomNum] === bgImage.value) {
		randomNum = randomNum < props.images.length - 1 ? randomNum + 1 : randomNum - 1
	}

	return props.images[randomNum]
}

</script>


<style lang="scss">
.home-background {
	position: absolute;
	top: 0;
	width: 100%;
	height: 100vh;
	z-index: -1;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}
</style>