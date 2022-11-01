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
		top: 0px;
		left: 0;
		z-index: -1;

		&::after,
		&::before {
			content: '';
			position: absolute;
			width: 110%;
			height: 100%;
			top: 10px;
			left: 0;
			pointer-events: none;
			-webkit-mask-image: url('http://localhost:5000/banners/wish/background-mask.svg');
			-webkit-mask-repeat: no-repeat;
			mask-image: url('http://localhost:5000/banners/wish/background-mask.svg');
			mask-repeat: no-repeat;
		}

		&::before {
			top: -8px;
		}

		&_four-star {
			filter: drop-shadow(0px 0px 30px rgb(196, 77, 218));

			&::after,
			&::before {

				background-color: rgba(197, 77, 218, 0.658);
			}
		}

		&_five-star {
			filter: drop-shadow(0px 0px 30px #ffe711);

			&::after,
			&::before {
				background-color: rgba(255, 231, 17, 0.555);
			}
		}

		&_three-star {
			filter: drop-shadow(0px 0px 30px #3498dba9);

			&::after,
			&::before {
				background-color: #3498db96;
			}

			&::after {
				top: 5px;
			}

			&::before {
				top: -3px;
			}
		}
	}
}
</style>