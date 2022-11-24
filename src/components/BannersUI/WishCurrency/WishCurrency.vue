<template>
	<section v-if="getActiveBannerWish" class="banners-currency">
		<figure @click="setPrimogems(getPrimogems + 1600)" class="banners-currency__primogems">
			<img src="@/assets/Icons/wishIcons/wish_Primogem.png" />
			<figcaption>{{ getPrimogems }}</figcaption>
			<i class="gi-plus banners-currency__plus" />
		</figure>

		<figure class="banners-currency__wishes">
			<img v-if="getActiveBannerWish[0] === BannerTypes.STANDARD"
				src="@/assets/Icons/wishIcons/standardWish.webp" />
			<img v-else src="@/assets/Icons/wishIcons/eventWish.webp" />
			<figcaption>{{ getWishes(getActiveBannerWish[0]) }}</figcaption>
		</figure>
		<CloseButton />
	</section>
</template>

<script setup lang="ts">
import CloseButton from '@/components/UI/CloseButton.vue';
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

	align-items: center;
	gap: 20px;

	&__primogems,
	&__wishes {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-width: 60px;
		width: fit-content;
		height: fit-content;
		padding: 0px 7px;
		font-size: 17px;
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
		display: flex;
		text-align: center;
		align-items: center;
		padding-right: 2px;

		figcaption {
			margin-right: 5px;
		}

		.banners-currency__plus {
			background-color: white;
			border-radius: 50%;
			color: black;
			width: 20px;
			font-size: 20px;
			height: 20px;
		}
	}
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
	.banners-currency {
		top: 5px;

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

@media only screen and (orientation: portrait) {
	.banners-currency {
		gap: 5px;
	}
}
</style>