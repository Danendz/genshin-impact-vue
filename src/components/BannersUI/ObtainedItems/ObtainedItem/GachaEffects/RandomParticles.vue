<template>
	<TransitionGroup :name="props.animationName" appear>
		<div class="obtained-item-gacha-effect__particle" :style="{
			transform: i === 0 ? `translateX(${translateXOffset}px)` : `rotate(${particlesRotateDeg * i}deg) translateX(${translateXOffset}px)`,
			clipPath: getRandomClipPath(),
			...getRandomWidthAndHeight(),
			animationDelay: `${props.animDelay}s`,
			background: getBgColor()
		}" v-for="i in particles_count" :key="i"></div>
	</TransitionGroup>
</template>


<script setup lang="ts">
import { ColorsType, getBackgroundColor } from '@/Composables/useGetColorByRarity';
import { CharacterOrWeapon } from '@/Composables/UseWishing';
import { useWindowSize } from '@vueuse/core';
import { onMounted, watch, ref, computed } from 'vue';

interface Props {
	animationName: string,
	item: CharacterOrWeapon,
	animDelay: number
}

const props = defineProps<Props>()
const { width } = useWindowSize()

let particles_count = ref(20);

const particlesRotateDeg = computed(() => {
	return 360 / particles_count.value
})

let translateXOffset = ref(250)
let maxParticleWidth = ref(230)

onMounted(() => {
	setTranslateXOffset()
})

watch(width, () => {
	setTranslateXOffset()

})

const setTranslateXOffset = () => {
	if (width.value <= 915) {
		translateXOffset.value = 150
		maxParticleWidth.value = 140
		particles_count.value = 8
	} else {
		translateXOffset.value = 250
		maxParticleWidth.value = 230
		particles_count.value = 25
	}
}

const customPaths = [
	'polygon(74.28% 48.62%, 99.25% 55.25%, 86.95% 58.59%, 79.31% 61.5%, 75.14% 66.66%, 23.5% 62.3%)',
	'polygon(75.28% 34.37%, 60.5% 42%, 80.5% 47%, 73.2% 51.59%, 55% 56.5%, 52.56% 61%, 15.14% 55.66%, 2.25% 50.3%)',
	'polygon(49.53% 48.87%, 56.75% 49%, 91.5% 46.25%, 85.5% 52%, 70.45% 57.34%, 57.31% 64%, 41.89% 65.91%, 25.75% 65.75%, 19.75% 64.3%, 35.5% 56%)',
	'polygon(60.78% 48.87%, 65.5% 46.25%, 81.75% 49%, 90% 52%, 72.25% 55.75%, 84.45% 64.59%, 62.81% 65%, 48.14% 63.41%, 36% 57.8%, 4.25% 48.5%)',
	'polygon(49.78% 46.37%, 77.75% 44.5%, 56.14% 51.91%, 48.75% 54.75%, 37.75% 52.3%, 32.75% 50%, 23.5% 49.5%, 4% 48.25%)'
]

const getRandomClipPath = () => {
	const random = Math.round(Math.random() * (customPaths.length - 1))
	return customPaths[random]
}

const getRandomWidthAndHeight = () => {
	const random = Math.random() * maxParticleWidth.value + 50
	return {
		width: `${random}px`,
		height: `${random}px`
	}
}

const BACKGROUND_COLORS_BY_RARITY: ColorsType = {
	"3": 'rgba(155, 208, 252, 0.582) 25%, rgb(66, 68, 202) 50%, rgba(155, 208, 252, 0.568) 85%,',
	"4": 'rgba(109, 67, 193, 0.582) 25%, rgb(211, 204, 211) 50%, rgba(109, 67, 193, 0.568) 85%,',
	"5": 'rgba(252, 160, 121, 0.582) 25%, rgb(240, 226, 177) 50%, rgba(252, 160, 121, 0.568) 85%,'
}

const getBgColor = () => {
	return `linear-gradient(90deg, transparent 0%, ${getBackgroundColor(props.item, BACKGROUND_COLORS_BY_RARITY)} transparent 100%)`
}


</script>

<style lang="scss">
@import '@/assets/Styles/animations/gacha_effects';

.obtained-item-gacha-effect__particle {
	position: absolute;
	z-index: 1;
	opacity: 0;
}
</style>