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
	const fourStarClass = 'total-item__item-img_four-star'

	if (!isCharacter(item)) return mainClass + ' ' + threeStarClass

	const itemRarity = parseInt(item.rarity)
	if (itemRarity === 5) return mainClass
	return mainClass + ' ' + fourStarClass
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
			box-shadow: inset 0px 0px 10px 5px rgba(255, 231, 17, 0.493);
		}

		&::before {
			box-shadow: inset 0px -10rem 30px -2px rgba(0, 0, 0, 0.281),
		}

		&_four-star {
			&::after {
				box-shadow: inset 0px 0px 10px 5px rgba(197, 77, 218, 0.479);
			}
		}

		&_three-star {
			&::before {
				box-shadow: inset 0px -5rem 15px -2px rgba(0, 0, 0, 0.12),
			}

			&::after {
				box-shadow: inset 0px 0px 20px 5px rgba(255, 255, 255, 0.445);
			}
		}
	}
}
</style>