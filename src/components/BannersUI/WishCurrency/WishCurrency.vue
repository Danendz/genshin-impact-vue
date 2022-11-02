<template>
	<section v-if="getActiveBannerWish" class="banners-currency">
		<figure @click="setPrimogems(getPrimogems + 1600)" class="banners-currency__primogems">
			<img src="@/assets/Icons/wishIcons/wish_Primogem.png" />
			<figcaption>{{ getPrimogems }}</figcaption>
		</figure>
		<figure class="banners-currency__wishes">
			<img v-if="getActiveBannerWish[0] === BannerTypes.STANDARD"
				src="@/assets/Icons/wishIcons/standardWish.webp" />
			<img v-else src="@/assets/Icons/wishIcons/eventWish.webp" />
			<figcaption>{{ getWishes(getActiveBannerWish[0]) }}</figcaption>
		</figure>
	</section>
</template>

<script setup lang="ts">
import { BannerTypes } from '@/Enums/WishEnums';
import { useActiveBanner } from '@/store/Gacha/activeBanner';
import { usePrimogems } from '@/store/Gacha/primogems';
import { useWishes } from '@/store/Gacha/wishes';


const { getPrimogems, setPrimogems } = usePrimogems()
const { getWishes } = useWishes()
const { getActiveBannerWish } = useActiveBanner()


</script>

<style lang="scss">
.banners-currency {
	z-index: 2;
	position: absolute;
	top: 10px;
	right: 10px;
	display: flex;
	gap: 20px;

	&__primogems,
	&__wishes {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-width: 60px;
		width: fit-content;

		padding: 0px 7px;
		text-align: end;
		border-radius: 15px;
		background-color: rgba(0, 0, 0, 0.411);
		user-select: none;
		color: white;

		img {
			width: 25px;
			height: 25px;
		}
	}

	&__primogems {
		position: relative;
		cursor: pointer;

		figcaption {
			margin-right: 20px;
		}

		&::after {
			content: '+';
			position: absolute;
			font-weight: 900;
			display: flex;
			font-size: 20px;
			justify-content: center;
			align-items: center;
			right: 2px;
			text-align: center;
			width: 20px;
			top: 3px;
			height: 19px;
			border-radius: 50%;
			color: black;
			background-color: white;
		}
	}
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
	.banners-currency {

		&__primogems,
		&__wishes {
			font-size: 14px;

			img {
				width: 23px;
				height: 23px;
			}
		}

		&__primogems {
			&::after {
				top: 2px;
				font-size: 20px;
			}
		}
	}
}
</style>