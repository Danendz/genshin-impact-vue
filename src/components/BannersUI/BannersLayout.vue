<template>
	<section class="banners-layout">
		<Transition name="fade-up" appear>
			<WishCurrency v-show="!getIsWishing" />
		</Transition>
		<BannersImages :activeBannerImage="getActiveBannerImage" @set-active="setActive" />
		<BannerVideo />
		<NotEnoughFunds />
	</section>
</template>

<script setup lang="ts">
//components
import BannerVideo from './BannersVideos/BannerVideo.vue';
import BannersImages from './BannersImages/BannersImages.vue';
import NotEnoughFunds from './NotEnoughFunds/NotEnoughFunds.vue';
import WishCurrency from './WishCurrency/WishCurrency.vue'
import { useWish } from '@/store/Gacha/Wish';

//stores
import { useBannersData } from '@/store/Gacha/bannersData';

//enums
import { BannerTypes } from '@/Enums/WishEnums';

//vue
import { onMounted } from 'vue'

import { useActiveBanner } from '@/store/Gacha/activeBanner';

const { getActiveBannerImage, getActiveBannerWish, setActiveBannerImage, setActiveBannerWish } = useActiveBanner()
const { getCurrentBanner } = useBannersData()

const { getIsWishing } = useWish()

onMounted(() => {
	if (!getActiveBannerWish.value) {
		if (getCurrentBanner.value?.event_five_star_character_images.length) {
			setActiveBannerWish([BannerTypes.EVENT, 0])
		} else {
			setActiveBannerWish([BannerTypes.STANDARD])
		}
	}
})

function setActive(index: number, banner: BannerTypes, eventIndex?: number): void {
	if (banner === BannerTypes.EVENT && eventIndex === undefined) throw new Error("Вы не указали ивентовый индекс для персонажа!")
	setActiveBannerWish([banner, eventIndex])
	setActiveBannerImage(index)
}

</script>

<style lang="scss">
.banners-layout {
	display: flex;
	overflow: hidden;
	flex-direction: column;
	position: relative;
	align-items: center;
	justify-content: space-between;
	margin: 0 auto;
	height: 100vh;
	gap: 10px;

	&_disabled {
		pointer-events: none;
	}

	&__bg-video-container {
		z-index: -1;

		.banners-layout__bg-video {
			height: 100%;
			width: 177.77777778vh;
			min-width: 100%;
			min-height: 56.25vw;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			position: absolute;
		}
	}
}


@media only screen and (orientation: portrait) {
	.banners-layout {
		justify-content: center;
	}
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
	.banners-layout {
		flex-direction: row;
		justify-content: space-around;
		gap: 0;
	}
}
</style>