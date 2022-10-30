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
import { useActiveBanner } from '@/store/Gacha/activeBanner';
import { useNotEnoughFunds } from '@/store/Gacha/notEnoughFunds';
import { useWish } from '@/store/Gacha/Wish';
import { useWishVideos } from '@/store/Gacha/wishVideos';


const { getActiveBannerWish } = useActiveBanner()
const { makeWishes, setIsWishing, getIsWishing } = useWish()
const { setIsNotEnough } = useNotEnoughFunds()
const { setCurrentWishVideo } = useWishVideos()

const makeWish = (amount: number) => {
	if (!getIsWishing.value) {
		const wishes = makeWishes(amount, ...getActiveBannerWish.value)

		if (typeof wishes === 'string') {
			setIsNotEnough(true);
		} else {
			setIsWishing(true)
			let rarity: number;
			if (wishes.length === 1) {
				rarity = parseInt(wishes[0].rarity.toString())
			} else {
				rarity = wishes.reduce((acc, next) => {
					return Math.max(acc, parseInt(next.rarity.toString()))
				}, parseInt(wishes[0].rarity.toString()))
			}

			setCurrentWishVideo(rarity, amount)

		}
	}
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