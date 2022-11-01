<template>
	<div :class="getItemImgClasses(props.item)" :style="getItemImgStyles(props.item)"></div>
</template>


<script setup lang="ts">
import { isCharacter } from '@/Composables/isCharacter';
import { CharacterOrWeapon } from '@/Composables/UseWishing';
import { CharacterImage } from '@/Enums/CharacterEnums';
import CharacterHelper from '@/helpers/CharacterHelper';

interface Props {
	item: CharacterOrWeapon
}

const props = defineProps<Props>()


const getItemImgStyles = (item: CharacterOrWeapon) => {
	return {
		backgroundImage: `url(${isCharacter(item)
			? CharacterHelper.getCharacterImage(item.name_key, CharacterImage.GACHA_CARD_LQ)
			: CharacterHelper.getWeaponsImage(item.name_key, CharacterImage.GACHA_SPLASH_LQ)})`,
		'-webkit-mask-image': `url(${CharacterHelper.getBannersImages('/wish/background-mask.svg')})`,
		'mask-image': `url(${CharacterHelper.getBannersImages('/wish/background-mask.svg')})`
	}
}

const getItemImgClasses = (item: CharacterOrWeapon) => {
	const mainClass = 'total-item__item-img'
	const threeStarClass = 'total-item__item-img_three-star'
	if (item.rarity === 3) {
		return mainClass + ' ' + threeStarClass
	}

	return mainClass
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

		&::before,
		&::after {
			content: '';
			top: 0;
			left: 0;
			position: absolute;
			width: 100%;
			height: 100%;
			filter: blur(4px);
			box-shadow: inset 0px 0px 15px 5px rgba(255, 255, 255, 0.521);
		}

		&::before {
			filter: blur(10px);
			box-shadow: inset 0px -10rem 0px -2px rgba(0, 0, 0, 0.274),
		}

		&_three-star {
			&::before {

				box-shadow: inset 0px -5rem 0px -2px rgba(0, 0, 0, 0.11),
			}

			&::after {
				filter: blur(7px);
				box-shadow: inset 0px 0px 10px 10px rgba(255, 255, 255, 0.445);
			}
		}
	}
}
</style>