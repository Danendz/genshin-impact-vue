<template>
	<div :key="index" class="total-item" :style="{
		transitionDelay: `${0.15 * index}s`
	}">
		<TotalItemBackgroundImage />
		<TotalItemImage :item="item" @is-character="isCharacter" />

		<img v-if="isCharacter(item)" class="total-item__item-vision"
			:src="CharacterHelper.getElementImage(item.vision)" />

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
	width: auto;
	height: 100%;
	position: relative;
	user-select: none;
}

@media only screen and (orientation: portrait) {}
</style>