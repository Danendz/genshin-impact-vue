<template>
	<section v-if="getEventBanner?.event_five_star_character && getEventWeaponBanner?.event_five_star_weapons"
		v-show="!getIsWishing" class="banners-sm">

		<BannerInfo v-show="!getIsWishing" class="mobile-banner-info" />
		<BannerIconTemplate v-for="url, index in getEventImages(getEventBanner.event_five_star_character, 'character')"
			:active-banner-image="props.activeBannerImage" :banner-type="BannerTypes.EVENT"
			:event-character-index="index" :index="index" :url="url" :key="index" />

		<BannerIconTemplate :key="getIndex(BannerTypes.EVENT_WEAPON)" :index="getIndex(BannerTypes.EVENT_WEAPON)"
			:active-banner-image="props.activeBannerImage" :banner-type="BannerTypes.EVENT_WEAPON"
			:url="getEventImages(getEventWeaponBanner.event_five_star_weapons, 'weapon')" />

		<BannerIconTemplate :is-standard="true" :key="getIndex(BannerTypes.STANDARD)"
			:index="getIndex(BannerTypes.STANDARD)" :active-banner-image="props.activeBannerImage"
			:banner-type="BannerTypes.STANDARD"
			:url="CharacterHelper.getCharacterImage('qiqi', CharacterImage.GACHA_SPLASH_LQ)" />
	</section>
</template>


<script setup lang="ts">
import { useWish } from '@/store/Gacha/Wish';
import { useBannersData } from '@/store/Gacha/bannersData';
import { BannerTypes } from '@/Enums/WishEnums';
import { CharacterImage } from '@/Enums/CharacterEnums';
import CharacterHelper from '@/helpers/CharacterHelper';
import WeaponHelper from '@/helpers/WeaponHelper';
import BannerIconTemplate from './BannerIconTemplate/BannerIconTemplate.vue';
import BannerInfo from '../../BannerInfo/BannerInfo.vue';

interface Props {
	activeBannerImage: number,
}

const props = defineProps<Props>()

const { getIsWishing } = useWish()
const { getEventBanner, getEventWeaponBanner } = useBannersData()

const getEventImages = (eventImages: string[], characterOrWeapon: 'character' | 'weapon') => {
	if (characterOrWeapon === 'character') {
		return eventImages.map((name) =>
			CharacterHelper.getCharacterImage(name, CharacterImage.PORTRAIT));
	} else {
		return eventImages.map((name) =>
			WeaponHelper.getWeaponsImage(name, CharacterImage.GACHA_SPLASH_LQ));
	}
}

const getIndex = (banner: BannerTypes.EVENT_WEAPON | BannerTypes.STANDARD): number => {
	if (!getEventBanner.value?.event_five_star_character) return 0;
	if (banner === BannerTypes.EVENT_WEAPON) {
		return getEventBanner.value.event_five_star_character.length
	} else {
		return getEventBanner.value.event_five_star_character.length + 1
	}
}

</script>


<style lang="scss">
.banners-sm {
	display: flex;
	gap: 10px;
	z-index: 1;
	position: absolute;
	top: 0px;
	justify-content: center;
	align-items: center;
	width: 100%;

	.mobile-banner-info {
		display: none;
		position: absolute;
		top: 5px;
		width: 100%;
		gap: 0;
		justify-content: center;
		left: unset;

		i {
			font-size: 30px;
			line-height: 0;
		}

		p {
			position: absolute;
			left: 80%;
		}
	}

	&::before {
		content: '';
		position: absolute;
		width: 50%;
		height: 100%;
		top: 0;
		background: linear-gradient(to bottom, #4b5365 0%, #4b536542 100%);
		z-index: -1;
		opacity: 0;
	}
}

@media only screen and (max-width: 1200px) and (orientation: landscape) {
	.banners-sm {
		flex-direction: column;
		position: relative;
		height: 100%;
		width: unset;

		.mobile-banner-info {
			display: flex;
		}

		&::before {
			opacity: 1;
		}

	}
}

@media only screen and (orientation: portrait) {
	.banners-sm {
		position: relative;
		justify-content: center;
		padding: 0 5px;
		width: 100%;
	}
}
</style>