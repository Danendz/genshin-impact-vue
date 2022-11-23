<template>
	<Transition name="banner-down" appear>
		<BannerIcon :active-banner-image="activeBannerImage" />
	</Transition>
	<Transition name="fade-right" appear>
		<section v-show="!getIsWishing" class="banners-lg">
			<Transition name="banner-right" mode="out-in" appear>
				<img :key="props.activeBannerImage" draggable="false" class="banners-lg__img"
					:src="bannerImages[activeBannerImage]" />
			</Transition>
		</section>
	</Transition>
</template>


<script setup lang="ts">
//enums
import { BannersEntities } from '@/Enums/BannersEnums';
//helpers
import WishHelper from '@/helpers/WishHelper';

//stores
import { useBannersData } from '@/store/Gacha/bannersData';
import { useWish } from '@/store/Gacha/Wish';

//vue
import { onMounted, ref } from 'vue';
import BannerIcon from './BannerIcon/BannerIcon.vue';

interface Props {
	activeBannerImage: number
}

const props = defineProps<Props>()
const { getEventBanner, getEventWeaponBanner } = useBannersData()
const { getIsWishing } = useWish()

const bannerImages = ref<string[]>([])

onMounted(() => {
	setBannerImages()
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

.banners-sm,
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

@media only screen and (orientation: portrait) {
	.banners-lg {
		width: 90%;
		align-items: center;

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
		max-height: 75vh;
		overflow: hidden;
	}
}

@media only screen and (max-height: 360px) and (orientation: landscape) {
	.banners-lg {
		max-width: 500px;
	}
}
</style>