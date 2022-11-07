<template>
	<Transition name="gacha-effect-background" appear>
		<div :style="{ background: getBgColor() }" :key="activeWish" class="obtained-item-gacha-effect-background">
			<RandomParticles :item="item" :anim-delay="0.05" :animation-name="'gacha-effect-particles'" />
		</div>
	</Transition>
	<Transition name="gacha-effect-foreground" appear>
		<div :style="{ animationDelay: `${foregroundDelay}s` }" :key="activeWish"
			class="obtained-item-gacha-effect-foreground">
			<div class="obtained-item-gacha-effect-foreground__circle">
			</div>
			<RandomParticles :item="item" :anim-delay="foregroundDelay"
				:animation-name="'gacha-effect-particles-foreground'" />
		</div>
	</Transition>
</template>


<script setup lang="ts">
import { ColorsType, getBackgroundColor } from '@/Composables/useGetColorByRarity';
import { CharacterOrWeapon } from '@/Composables/UseWishing';
import RandomParticles from './GachaEffects/RandomParticles.vue'

interface Props {
	activeWish: number,
	item: CharacterOrWeapon
}

const props = defineProps<Props>()

const foregroundDelay = 0.60;

const RARITY_COLORS_BACKGROUND: ColorsType = {
	"3": 'rgba(46, 91, 227, 0.46)',
	"4": 'rgba(166, 45, 236, 0.46)',
	"5": 'rgba(255, 182, 7, 0.56)'
}

const getBgColor = () => {
	return `radial-gradient(circle, ${getBackgroundColor(props.item, RARITY_COLORS_BACKGROUND)} 0%, rgba(46, 91, 227, 0) 80%)`
}

</script>


<style lang="scss">
@import '@/assets/Styles/animations/gacha_effects';

.obtained-item-gacha-effect-foreground,
.obtained-item-gacha-effect-background {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: -1;

	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	user-select: none;
}

.obtained-item-gacha-effect-foreground {
	border-radius: 0;
	background: unset;
	opacity: 0;
	z-index: 1;

	&__circle {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		z-index: -1;
	}
}
</style>