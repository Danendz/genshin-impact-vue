<template>
	<Transition :name="getWishInfoAnimation()" appear mode="out-in">
		<section :key="activeWish" :style="{ transitionDelay: '0.5s' }" class="banners-obtained-item-info ">

			<img class="banners-obtained-item-info__vision" alt="vision" v-if="isCharacter(item)" draggable="false"
				:src="CharacterHelper.getElementImage(item.vision_key)" />

			<img class="banners-obtained-item-info__weapon-icon" :alt="item.type" draggable="false"
				:src="WishHelper.getWishWeaponsIcons(item.type)" v-else />

			<section class="banners-obtained-item-info__name-rarity">
				<p>{{ item.name }}</p>
				<TransitionGroup name="fade-star-wish" appear>
					<Icon :style="{ transitionDelay: `${0.3 * index}s` }"
						class="banners-obtained-item-info__rarity-star" icon="bxs:star"
						v-for="num, index in props.item.rarity" :key="num" />
				</TransitionGroup>
			</section>
		</section>
	</Transition>
</template>


<script setup lang="ts">
//composables
import { CharacterOrWeapon } from '@/Composables/UseWishing';
import { isCharacter } from '@/Composables/isCharacter';
import { useScreenOrientation } from '@vueuse/core';

//helpers
import CharacterHelper from '@/helpers/CharacterHelper';

//components
import { Icon } from '@iconify/vue';
import WishHelper from '@/helpers/WishHelper';


interface Props {
	item: CharacterOrWeapon
	activeWish: number;
}

const props = defineProps<Props>()

const screenOrientation = useScreenOrientation()

const getWishInfoAnimation = () => {
	if (screenOrientation.orientation) {
		return screenOrientation.orientation.value === 'landscape-primary' ? 'fade-wish-info' : 'fade-wish-info-portrait'
	}
	return 'fade-wish-info'
}

</script>

<style lang="scss">
.banners-obtained-item-info {
	position: relative;
	display: flex;
	margin-right: auto;
	width: 100%;
	max-width: 500px;
	align-items: center;

	&__vision {
		width: auto;
		height: 100%;
	}

	&__weapon-icon {
		width: 20%;
		height: 100%;
		z-index: 0;
	}

	&__name-rarity {
		z-index: 1;
		transform: translateX(-10px);

		p {
			color: white;
			font-size: 35px;
			max-width: 350px;
		}
	}

	&__rarity-star {
		color: yellow;
		font-size: 20px;
	}
}

@media only screen and (max-width: 915px) {
	.banners-obtained-item-info {
		&__name-rarity {
			p {
				font-size: 25px;
				max-width: 250px;
			}
		}

		&__rarity-star {
			font-size: 15px;
		}
	}
}

@media only screen and (orientation: portrait) {
	.banners-obtained-item-info {
		margin-top: auto;
		background-color: rgba(0, 0, 0, 0.74);

		z-index: 9;
		width: 100vw;
		max-width: none;
		text-align: center;

		&__vision {
			height: 80%;
		}

		&__weapon-icon {
			width: 15%;
		}

		&__name-rarity {
			transform: translate(0);
			margin-right: auto;
			margin-left: auto;
		}
	}
}

@media only screen and (max-width:915px) and (orientation: landscape) {
	.banners-obtained-item-info {
		&__weapon-icon {
			width: 15%;
		}
	}
}

@media only screen and (max-width: 720px) and (orientation: landscape) {
	.banners-obtained-item-info {
		&__name-rarity {
			p {
				font-size: 22px;
				max-width: 200px;
			}
		}
	}
}
</style>