<template>
	<div v-if="props.item.rarity === 5" class="total-item__item-shadow total-item__item-shadow_five-star">
	</div>
	<div v-else-if="item.rarity === 4" class="total-item__item-shadow total-item__item-shadow_four-star">
	</div>
	<div v-else class="total-item__item-shadow total-item__item-shadow_three-star">
	</div>

</template>


<script setup lang="ts">
import { CharacterOrWeapon } from '@/Composables/UseWishing';


interface Props {
	item: CharacterOrWeapon
}

const props = defineProps<Props>()

</script>


<style lang="scss">
.total-item {
	&__item-shadow {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 1.5%;
		left: 0;
		z-index: -1;
		-webkit-mask-image: url('https://genshin-api-vue.herokuapp.com/wish/background-mask.svg');
		-webkit-mask-repeat: no-repeat;
		mask-image: url('https://genshin-api-vue.herokuapp.com/wish/background-mask.svg');
		mask-repeat: no-repeat;

		&_four-star {
			background-color: rgb(197, 77, 218);
		}

		&_five-star {
			background-color: rgb(255, 231, 17);
		}

		&_three-star {
			background-color: #3498db;
		}
	}
}
</style>
