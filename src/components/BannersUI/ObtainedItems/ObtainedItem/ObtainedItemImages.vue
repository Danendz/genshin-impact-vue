<template>
	<Transition name="fade-wish-weapon-bg" appear>
		<img :style="{ transitionDelay: '0.55s' }" :key="activeWish" v-if="!isCharacter(item) && item.type"
			:src="CharacterHelper.getBannersImages(`/wish/${item.type.toLowerCase()}/background`)" alt="weapon-bg"
			class="banners-obtained-item__weapon-bg" />
	</Transition>
	<Transition :name="getWishImgAnimation()" mode="out-in" appear>
		<img alt="gacha splash" :key="props.activeWish" class="banners-obtained-item__gacha-img" draggable="false" :src="isCharacter(item)
		? CharacterHelper.getCharacterImage(item.name_key, CharacterImage.GACHA_SPLASH_LQ)
		: CharacterHelper.getWeaponsImage(item.name_key, CharacterImage.GACHA_SPLASH_LQ)" />
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
			? 'fade-wish-img'
			: 'fade-wish-img-portrait'
	}

	return 'fade-wish-img'
}

</script>


<style lang="scss">
.banners-obtained-item {

	&__weapon-bg,
	&__gacha-img {
		width: auto;
		min-width: 300px;
		transform: translateX(0px);
		position: absolute;
		height: 100vh;
		z-index: 0;
	}
}

@media only screen and (max-width: 915px) {
	.banners-obtained-item {
		&__gacha-img {
			min-width: 100px;
		}
	}
}

@media only screen and (orientation: portrait) {
	.banners-obtained-item {
		&__gacha-img {
			min-width: 0;
			transform: translateX(0px);
		}
	}
}
</style>