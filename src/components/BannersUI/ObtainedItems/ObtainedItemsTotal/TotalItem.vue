<template>
	<div :key="index" class="total-item" :style="{
		transitionDelay: `${0.15 * index}s`
	}">
		<TotalItemBackgroundImage />
		<TotalItemImage :item="item" @is-character="isCharacter" />

		<img draggable="false" v-if="isCharacter(item)" class="total-item__item-vision"
			:src="CharacterHelper.getElementImage(item.vision)" />

		<section class="total-item__item-rarity">
			<Icon icon="bxs:star" v-for="num in item.rarity" :key="num" />
		</section>



		<TotalItemShadows :item="props.item" />
	</div>
</template>


<script setup lang="ts">
import { CharacterOrWeapon } from '@/Composables/UseWishing';
import CharacterHelper from '@/helpers/CharacterHelper';
import TotalItemBackgroundImage from './TotalItemBackgroundImage.vue';
import TotalItemImage from './TotalItemImage.vue';
import { isCharacter } from '@/Composables/isCharacter'
import TotalItemShadows from './TotalItemShadows.vue';
import { Icon } from '@iconify/vue';


interface Props {
	index: number,
	item: CharacterOrWeapon
}

const props = defineProps<Props>()

</script>


<style lang="scss">
.total-item {
	display: flex;
	justify-content: center;
	align-items: center;

	position: relative;
	user-select: none;

	&__item-vision {
		z-index: 6;
		width: 60%;
		height: auto;
		position: absolute;
		bottom: 15%;
	}

	&__item-rarity {
		position: absolute;
		z-index: 6;
		bottom: 8%;
		color: #f1c40f;
		font-size: 16px;
	}
}



@media only screen and (max-width: 915px) {
	.total-item {

		&__item-rarity {
			font-size: 9px;
		}
	}
}

@media only screen and (max-width: 280px) {
	.total-item {
		&__item-rarity {
			font-size: 7px;
		}
	}
}

@media only screen and (min-height: 1024px) and (orientation: portrait) {
	.total-item {
		&__item-rarity {
			font-size: 16px;
		}
	}
}
</style>