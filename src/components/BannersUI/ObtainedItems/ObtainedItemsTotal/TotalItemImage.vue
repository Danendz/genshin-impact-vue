<template>
	<div :class="['total-item__item-img',]" :style="getItemImgStyles(props.item)"></div>
</template>


<script setup lang="ts">
import { isCharacter } from '@/Composables/isCharacter';
import { CharacterOrWeapon } from '@/Composables/UseWishing';
import { CharacterImage } from '@/Enums/CharacterEnums';
import CharacterHelper from '@/helpers/CharacterHelper';
import WeaponHelper from '@/helpers/WeaponHelper';
import WishHelper from '@/helpers/WishHelper';

interface Props {
	item: CharacterOrWeapon
}

const props = defineProps<Props>()

const getItemImgStyles = (item: CharacterOrWeapon) => {
	return {
		backgroundImage: `url(${isCharacter(item)
			? CharacterHelper.getCharacterImage(item.name_key, CharacterImage.GACHA_CARD_LQ)
			: WeaponHelper.getWeaponsImage(item.name_key, CharacterImage.GACHA_SPLASH_LQ)})`,
		'-webkit-mask-image': `url(${WishHelper.getBannersImages('/wish/background-mask.svg')})`,
		'mask-image': `url(${WishHelper.getBannersImages('/wish/background-mask.svg')})`
	}
}


</script>


<style lang="scss">
.total-item {
	&__item-img {
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		position: absolute;
		top: 2px;
		z-index: 6;
		width: 100%;
		height: 100%;
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;


		&::after {
			content: '';
			bottom: 0;
			left: 0;
			position: absolute;
			width: 100%;
			height: 50%;
			background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.342) 100%);
		}
	}
}
</style>