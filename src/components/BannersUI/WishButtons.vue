<template>
	<section class="banners-layout__wish-buttons">
		<button @click="makeWish(1)">
			Использовать 1
		</button>
		<button @click="makeWish(10)">
			Использовать 10
		</button>
	</section>
</template>


<script setup lang="ts">
import { useWish } from '@/store/Gacha/Wish';

const { makeWishes, getActiveBannerWish } = useWish()

const makeWish = (amount: number) => {
	console.log(makeWishes(amount, ...getActiveBannerWish.value))
}

</script> 


<style lang="scss">
.banners-layout__wish-buttons {
	display: flex;
	gap: 10px;

	button {
		width: 200px;
		height: 35px;
		border-radius: 10px;
		border: 1px solid transparent;
		background-color: white;
		cursor: pointer;
		transition: .3s;

		&:hover {
			border-color: rgba(0, 0, 0, 0.596);
		}
	}
}

@media only screen and (max-width: 915px) {
	.banners-layout__wish-buttons {
		button {
			width: 150px;
		}
	}
}
</style>