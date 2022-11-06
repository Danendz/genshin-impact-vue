<template>
	<section @click="changeWish" class="banners-obtained-item">
		<ObtainedItemInfo :item="item" :active-wish="activeWish" />
		<ObtainedItemImages :item="item" :active-wish="activeWish" />
		<ObtainedItemEffect :item="item" :active-wish="activeWish" />
	</section>
</template>

<script setup lang="ts">
//components
import ObtainedItemInfo from './ObtainedItemInfo.vue';
import ObtainedItemImages from './ObtainedItemImages.vue';

//composables
import { CharacterOrWeapon } from '@/Composables/UseWishing';

//store
import { useObtainedItems } from '@/store/Gacha/obtainedItems';

//vue
import { watch, ref, onMounted } from 'vue';
import ObtainedItemEffect from './ObtainedItemEffect.vue';

interface Props {
	activeWish: number,
}

const emit = defineEmits<{
	(e: 'next-wish'): void
}>()

const props = defineProps<Props>()

const { getObtainedItems } = useObtainedItems()

const item = ref<CharacterOrWeapon>(getObtainedItems.value[props.activeWish])

let canGoNext = false;
let autoAllowGoNext: number;

watch(() => props.activeWish, () => {
	item.value = getObtainedItems.value[props.activeWish]
	canGoNext = false
	setDelay()
})

onMounted(() => {
	setDelay()
})

const setDelay = () => {
	clearTimeout(autoAllowGoNext)
	autoAllowGoNext = setTimeout(() => {
		canGoNext = true;
	}, 750);
}

const changeWish = () => {
	if (canGoNext) {
		emit('next-wish')
	}
}

</script>

<style lang="scss">
@import '@/assets/Styles/animations/wish';

.banners-obtained-item {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	max-width: 1400px;
}

@media only screen and (orientation: portrait) {
	.banners-obtained-item {
		flex-direction: column;
	}
}

@media only screen and (max-width:915px) and (orientation: landscape) {
	.banners-obtained-item {
		width: 100%;
	}
}
</style>