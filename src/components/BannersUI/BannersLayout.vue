<template>
	<section class="banners-container">
		<BannerVideo />
		<ObtainedItems />
		<Transition name="fade" appear>
			<section v-show="!getIsWishing" class="banners-container__layout">
				<BannerHeader />
				<BannersImages :activeBannerImage="getActiveBannerImage" />
				<!-- <BannerInformation /> -->
				<NotEnoughFunds />
				<WishButtons />
			</section>
		</Transition>
	</section>
</template>

<script setup lang="ts">
//components
import BannerVideo from './BannersVideos/BannerVideo.vue';
import BannersImages from './BannersImages/BannersImages.vue';
import NotEnoughFunds from './NotEnoughFunds/NotEnoughFunds.vue';
import ObtainedItems from './ObtainedItems/ObtainedItems.vue'
import WishButtons from './WishButtons.vue';
import BannerHeader from './BannerHeader/BannerHeader.vue';

//stores
import { useBannersData } from '@/store/Gacha/bannersData';
import { useWish } from '@/store/Gacha/Wish';
import { useActiveBanner } from '@/store/Gacha/activeBanner';
import { useObtainedItems } from '@/store/Gacha/obtainedItems';
import { useWishVideos } from '@/store/Gacha/wishVideos';

//enums
import { BannerTypes } from '@/Enums/WishEnums';

//vue
import { onMounted } from 'vue'

const { getActiveBannerImage, getActiveBannerWish, setActiveBannerWish } = useActiveBanner()
const { getEventBanner } = useBannersData()
const { getShowObtainedItems, setShowObtainedItems, clearObtainedItems, setActiveWish } = useObtainedItems()
const { setCurrentWishVideo } = useWishVideos()
const { getIsWishing, setIsWishing } = useWish()

onMounted(() => {
	if (!getActiveBannerWish.value) {
		if (getEventBanner.value?.event_five_star_banners_names.length) {
			setActiveBannerWish([BannerTypes.EVENT, 0])
		} else {
			setActiveBannerWish([BannerTypes.STANDARD])
		}
	}
	if (!getShowObtainedItems.value) {
		setShowObtainedItems(false)
		clearObtainedItems()
		setIsWishing(false)
		setCurrentWishVideo(3, 1, true)
		setActiveWish(0)
	}
})


</script>

<style lang="scss">
.banners-container {
	overflow: hidden;
	position: relative;
	height: 100vh;

	&__layout {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		max-width: 1600px;
		margin: 0 auto;
		height: 95vh;
		z-index: 2;
	}

	&_disabled {
		pointer-events: none;
	}
}


@media only screen and (orientation: portrait) {
	.banners-container {
		&__layout {
			height: 100vh;
			justify-content: center;
			margin-top: 0px;
			gap: 10px;
		}

	}
}

@media only screen and (max-width: 1200px) and (orientation: landscape) {
	.banners-container {

		&__layout {
			flex-direction: row;
			justify-content: space-around;
			gap: 0;
			margin-top: 0;
			height: 100vh;
		}
	}
}
</style>