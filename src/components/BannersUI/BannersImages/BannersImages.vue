<template>
	<Transition name="banner-fade" appear>
		<BannerIcon class="mobile-banners-icons" :active-banner-image="activeBannerImage" />
	</Transition>
	<Transition name="fade-right" appear>
		<section v-show="!getIsWishing" :class="['banners-lg', { 'banners-lg__standard-banner': isStandard }]">
			<Transition name="banner-right" mode="out-in" @before-enter="setStandard" appear>
				<img :key="props.activeBannerImage" draggable="false" class="banners-lg__img"
					:src="bannerImages[activeBannerImage]" />
			</Transition>
		</section>
	</Transition>
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

interface Props {
	activeBannerImage: number
}

const props = defineProps<Props>()
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
	flex-direction: column;
	justify-content: center;
	align-items: flex-end;
	gap: 10px;

	&__img {
		width: 100%;
		height: auto;
	}

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
}

@media only screen and (max-width: 1200px) and (orientation: landscape) {
	.banners-lg {
		width: 80%;
	}


}

@media only screen and (max-width: 915px) and (orientation: landscape) {
	.banners-lg {
		max-width: 600px;
		overflow: hidden;

		&__standard-banner {
			align-self: flex-start;
			margin-top: 10px;
		}
	}
}

@media only screen and (max-height: 360px) and (orientation: landscape) {
	.banners-lg {
		max-width: 500px;
	}
}
</style>