<template>
	<Transition name="fade-up" appear>
		<header v-show="!getIsWishing">
			<BannerInfo class="header-banner-info" />
			<Transition name="banner-down" appear>
				<BannerIcon class="header-banner-icons" :active-banner-image="getActiveBannerImage" />
			</Transition>
			<WishCurrency class="header-banner-currency" />
		</header>
	</Transition>
</template>


<script setup lang="ts">
//components
import BannerIcon from '../BannersImages/BannerIcon/BannerIcon.vue';
import BannerInfo from '../BannerInfo/BannerInfo.vue';
import WishCurrency from '../WishCurrency/WishCurrency.vue'

//store
import { useActiveBanner } from '@/store/Gacha/activeBanner'
import { useWish } from '@/store/Gacha/Wish';

const { getActiveBannerImage } = useActiveBanner()
const { getIsWishing } = useWish()

</script>

<style scoped lang="scss">
header {
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	position: absolute;
	top: 0;
	height: max-content;

	.header-banner-currency,
	.header-banner-icons,
	.header-banner-info {
		position: relative;
		width: 100%;
	}

	.header-banner-icons {
		display: none;
	}

	.header-banner-currency {
		justify-content: flex-end;
	}
}

@media only screen and (min-width: 1200px) {
	header {
		.header-banner-icons {
			display: flex;

		}
	}
}
</style>