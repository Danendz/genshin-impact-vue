<template>
	<Transition name="fade-wish-weapon-bg" appear>
		<img :style="{ transitionDelay: '0.55s' }" :key="activeWish" v-if="!isCharacter(item) && item.type"
			:src="CharacterHelper.getBannersImages(`/wish/${item.type.toLowerCase()}/background`)" alt="weapon-bg"
			class="banners-obtained-item__weapon-bg" />
	</Transition>
	<Transition :name="getWishImgAnimation()" mode="out-in" appear>
		<img v-if="isCharacter(item)" alt="gacha splash" :key="props.activeWish"
			class="banners-obtained-item__gacha-img" draggable="false"
			:src="CharacterHelper.getCharacterImage(item.name_key, CharacterImage.GACHA_SPLASH_LQ)" />
	</Transition>
	<Transition :name="getWishImgAnimation()" mode="out-in" appear>
		<img v-if="!isCharacter(item)" alt="gacha splash" :key="props.activeWish"
			class="banners-obtained-item__weapon-img" draggable="false"
			:src="CharacterHelper.getWeaponsImage(item.name_key, CharacterImage.GACHA_SPLASH_LQ)" />
	</Transition>
</template>

<script setup lang="ts">
//helpers
import CharacterHelper from '@/helpers/CharacterHelper';

//enums
import { CharacterImage } from '@/Enums/CharacterEnums';

//composables
import { isCharacter } from '@/Composables/isCharacter';
import { useScreenOrientation } from '@vueuse/core';
import { CharacterOrWeapon } from '@/Composables/UseWishing';

interface Props {
	item: CharacterOrWeapon,
	activeWish: number
}

const props = defineProps<Props>()

const screenOrientation = useScreenOrientation()

const getWishImgAnimation = () => {
	if (screenOrientation.orientation) {
		return screenOrientation.orientation.value === 'landscape-primary'
			? isCharacter(props.item) ? 'fade-wish-img' : 'fade-wish-weapon-img'
			: 'fade-wish-img-portrait'
	}

	return 'fade-wish-img'
}

</script>


<style lang="scss">
.banners-obtained-item {

	&__weapon-bg,
	&__weapon-img,
	&__gacha-img {
		width: auto;
		min-width: 300px;
		transform: translateX(0px);
		position: absolute;
		height: 100vh;
		z-index: 0;
	}

	&__weapon-img {
		transform: translateX(40px);
	}

}

@media only screen and (max-width: 915px) {
	.banners-obtained-item {

		&__weapon-img,
		&__gacha-img {
			min-width: 100px;
		}

		&__weapon-img {
			transform: translateX(20px);
		}
	}
}

@media only screen and (orientation: portrait) {
	.banners-obtained-item {

		&__weapon-bg,
		&__weapon-img,
		&__gacha-img {
			min-width: 0;
		}

		&__weapon-img,
		&__weapon-bg {
			min-width: 0;
			height: 60vh;
		}
	}
}
</style>