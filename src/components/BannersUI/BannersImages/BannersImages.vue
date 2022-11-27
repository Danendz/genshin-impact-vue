<template>
	<Transition name="banner-fade" appear>
		<BannerIcon class="mobile-banners-icons" :active-banner-image="activeBannerImage" />
	</Transition>
	<i v-if="getActiveBannerImage !== 0" @click="toggleBanner(-1)" class="gi-arrow-left" />
	<Transition name="fade-right" appear>
		<section v-show="!getIsWishing" :class="['banners-lg', { 'banners-lg__standard-banner': isStandard }]">
			<Transition name="banner-right" mode="out-in" @before-enter="setStandard" appear>
				<img :key="props.activeBannerImage" draggable="false" class="banners-lg__img"
					:src="bannerImages[activeBannerImage]" />
			</Transition>
		</section>
	</Transition>
	<i v-if="getTotalBannerWishes && getActiveBannerImage !== getTotalBannerWishes?.length - 1" @click="toggleBanner(1)"
		class="gi-arrow-right" />
</template>


<script setup lang="ts">
import BannerIcon from './BannerIcon/BannerIcon.vue';
//enums
import { BannersEntities } from '@/Enums/BannersEnums';
//helpers
import WishHelper from '@/helpers/WishHelper';

//stores
import { useBannersData } from '@/store/Gacha/bannersData';
import { useWish } from '@/store/Gacha/Wish';

//vue
import { onMounted, ref } from 'vue';
import { useActiveBanner } from '@/store/Gacha/activeBanner';

interface Props {
	activeBannerImage: number
}

const props = defineProps<Props>()
const { setActiveBannerImage, getActiveBannerImage, getTotalBannerWishes } = useActiveBanner()
const { getEventBanner, getEventWeaponBanner } = useBannersData()
const { getIsWishing } = useWish()

const bannerImages = ref<string[]>([])
const isStandard = ref(false);

const setStandard = () => {
	if (props.activeBannerImage === bannerImages.value.length - 1) {
		isStandard.value = true;
	} else {
		isStandard.value = false;
	}
}

const toggleBanner = (value: number) => {
	if (!getTotalBannerWishes.value?.length) return;

	const nextImage = getActiveBannerImage.value + value;

	if (nextImage >= 0 && nextImage < getTotalBannerWishes.value.length) {
		setActiveBannerImage(nextImage);
	}
}


onMounted(() => {
	setBannerImages()
	setStandard()
})

const setBannerImages = () => {
	if (getEventBanner.value?.event_five_star_banners_names) {
		bannerImages.value.push(...getEventBanner.value.event_five_star_banners_names.map((value) => getBannerImages(BannersEntities.EVENT_BANNERS, value)))
	}
	if (getEventWeaponBanner.value?.event_five_star_weapons_banner_name) {
		bannerImages.value.push(getBannerImages(BannersEntities.EVENT_WEAPON_BANNER, getEventWeaponBanner.value.event_five_star_weapons_banner_name))
	}
	bannerImages.value.push(getBannerImages(BannersEntities.STANDARD_BANNER))
}


const getBannerImages = (banner: BannersEntities, name?: string) => {
	name = name ? name + '/' : ''
	return WishHelper.getBannerImageByName(banner, name)
}
</script>


<style lang="scss">
@import '@/assets/Styles/animations/banners';
@import '@/assets/Styles/animations';

.banners-lg {
	user-select: none;
	-webkit-user-drag: none;
}

.banners-lg {
	min-width: 300px;
	max-width: 1250px;
	width: 90%;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;

	&__img {
		width: 100%;
		height: auto;
	}
}

.gi-arrow-left,
.gi-arrow-right {
	color: rgba(255, 255, 255, 0.856);
	position: absolute;
	line-height: 0;
	font-size: 40px;
	cursor: pointer;
	transition: .1s;
}

.gi-arrow-left:hover,
.gi-arrow-right:hover {
	color: white;
	transform: scale(1.1);
}

.gi-arrow-left {
	left: 0;
}

.gi-arrow-right {
	right: 0;
}

.mobile-banners-icons {
	display: none;
}

@media only screen and (orientation: portrait) {
	.banners-lg {
		width: 90%;
		align-items: center;
		justify-content: unset;
		height: 45vw;
	}
}

@media only screen and (max-width: 1200px) {
	.mobile-banners-icons {
		display: flex;
	}

	.gi-arrow-left,
	.gi-arrow-right {
		display: none;
	}
}

@media only screen and (max-width: 1200px) and (orientation: landscape) {
	.banners-lg {
		width: 80%;
	}
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
	.banners-lg {
		max-width: 70vw;

		&__standard-banner {
			align-self: center;
			margin-bottom: 15px;
		}
	}
}

@media only screen and (max-height: 360px) and (orientation: landscape) {
	.banners-lg {
		max-width: 500px;
	}
}
</style>