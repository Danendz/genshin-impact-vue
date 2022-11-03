<template>
	<section @click="changeWish" class="banners-obtained-item">
		<Transition :name="getWishInfoAnimation()" appear mode="out-in">
			<section :style="{ transitionDelay: '0.5s' }" :key="activeWish" class="banners-obtained-item__info">
				<img v-if="isCharacter(item)" draggable="false" :src="CharacterHelper.getElementImage(item.vision)" />
				<section class="banners-obtained-item__name-rarity">
					<p>{{ item.name }}</p>
					<TransitionGroup name="fade-star-wish" appear>
						<Icon :style="{ transitionDelay: `${0.3 * index}s` }" class="banners-obtained-item__rarity-star"
							icon="bxs:star" v-for="num, index in item.rarity" :key="num" />
					</TransitionGroup>
				</section>
			</section>
		</Transition>
		<Transition :name="getWishImgAnimation()" mode="out-in" appear>
			<img @animationstart="onAnimationStart" @animationend="onAnimationEnd" :key="activeWish"
				class="banners-obtained-item__gacha-img" draggable="false" :src="isCharacter(item)
				? CharacterHelper.getCharacterImage(item.name_key, CharacterImage.GACHA_SPLASH_LQ)
				: CharacterHelper.getWeaponsImage(item.name_key, CharacterImage.GACHA_SPLASH_LQ)" />
		</Transition>
	</section>
</template>

<script setup lang="ts">
//iconify
import { Icon } from '@iconify/vue';

//helpers
import CharacterHelper from '@/helpers/CharacterHelper';

//enums
import { CharacterImage } from '@/Enums/CharacterEnums';

//composables
import { CharacterOrWeapon } from '@/Composables/UseWishing';
import { isCharacter } from '@/Composables/isCharacter';

//store
import { useObtainedItems } from '@/store/Gacha/obtainedItems';

//vueUse
import { useScreenOrientation } from '@vueuse/core';

//vue
import { watch, ref } from 'vue';

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
	clearTimeout(autoAllowGoNext)
	autoAllowGoNext = setTimeout(() => {
		canGoNext = true;
	}, 5000);
})

const onAnimationStart = () => {
	console.log('started')
	canGoNext = false;
}

const onAnimationEnd = () => {
	console.log('ended')
	canGoNext = true
}

const changeWish = () => {
	if (canGoNext) {
		emit('next-wish')
	}
}

const screenOrientation = useScreenOrientation()

const getWishInfoAnimation = () => {
	if (screenOrientation.orientation) {
		return screenOrientation.orientation.value === 'landscape-primary' ? 'fade-wish-info' : 'fade-wish-info-portrait'
	}
	return 'fade-wish-info'
}

const getWishImgAnimation = () => {
	if (screenOrientation.orientation) {
		return screenOrientation.orientation.value === 'landscape-primary'
			? 'fade-wish-img'
			: 'fade-wish-img-portrait'
	}

	return 'fade-wish-img'
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

	&__info {
		position: relative;
		display: flex;
		margin-right: auto;
		max-width: 300px;
		align-items: center;

		img {
			width: auto;
			height: 100%;
			z-index: 0;
		}

		.banners-obtained-item__name-rarity {
			z-index: 1;

			p {
				color: white;
				font-size: 35px;
				font-weight: bold;
			}

			.banners-obtained-item__rarity-star {
				color: yellow;
				font-size: 20px;
			}
		}
	}

	&__gacha-img {
		width: auto;
		min-width: 300px;
		transform: translateX(100px);
		position: absolute;
		height: 100vh;

	}
}

@media only screen and (orientation: portrait) {
	.banners-obtained-item {
		flex-direction: column;

		&__info {
			margin-top: auto;
			background-color: rgba(0, 0, 0, 0.74);

			z-index: 9;
			width: 100vw;
			max-width: none;
			text-align: center;

			img {
				position: relative;
				left: 0;
				height: 80%;
			}

			.banners-obtained-item__name-rarity {
				margin-right: auto;
				margin-left: auto;
			}

		}

		&__gacha-img {
			min-width: 0;
			transform: translateX(0px);
		}
	}
}

@media only screen and (max-width: 915px) {
	.banners-obtained-item {
		&__info {
			.banners-obtained-item__name-rarity {
				p {
					font-size: 30px;
				}

				.banners-obtained-item__rarity-star {
					font-size: 15px;
				}
			}
		}

		&__gacha-img {
			min-width: 100px;
		}
	}
}

@media only screen and (max-width:915px) and (orientation: landscape) {
	.banners-obtained-item {
		width: 70%;
	}
}
</style>