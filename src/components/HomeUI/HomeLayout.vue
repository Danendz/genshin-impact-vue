<template>
	<HomeBackground :images="props.images" />
	<Transition name="fade">
		<main v-show="!optionStates.settings" class="home-menu">
			<HomeMenuOptions @set-active-option="setOption" :animation-postfix="animationOrientation" />
			<HomeMain :animation-postfix="animationOrientation" />
		</main>
	</Transition>
	<HomeOptionsComponents :set-option-state="setOption" :options-states="optionStates" />
</template>


<script setup lang="ts">
//components
import HomeMenuOptions from './HomeMenuOptions/HomeMenuOptions.vue';
import HomeMain from './HomeMain/HomeMain.vue'
import HomeBackground from './HomeBackground/HomeBackground.vue'
import HomeOptionsComponents from './HomeOptionsComponents/HomeOptionsComponents.vue';

//vue
import { ref, onMounted, watch } from 'vue';
import { useScreenOrientation } from '@vueuse/core';
import { HomeOptionStates } from '@/Interfaces/HomeOptionsStates';

interface Props {
	images: string[] | null
}

const props = defineProps<Props>()
const { orientation } = useScreenOrientation()

const optionStates = ref<HomeOptionStates>({
	camera: false,
	eventHub: false,
	mail: false,
	time: false,
	settings: false,
})

const setOption = (key: keyof HomeOptionStates, value: boolean) => {
	optionStates.value[key] = value;
}

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