<template>
	<header>
		<BannerInfo />
		<Transition name="banner-down" appear>
			<BannerIcon :active-banner-image="getActiveBannerImage" />
		</Transition>
		<WishCurrency />
	</header>
</template>


<script setup lang="ts">
//components
import BannerIcon from '../BannersImages/BannerIcon/BannerIcon.vue';
import BannerInfo from '../BannerInfo/BannerInfo.vue';
import WishCurrency from '../WishCurrency/WishCurrency.vue'

//store
import { useActiveBanner } from '@/store/Gacha/activeBanner'

const { getActiveBannerImage } = useActiveBanner()

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
}
</style>