<template>
	<section v-if="getEventBanner?.event_five_star_character && getEventWeaponBanner?.event_five_star_weapons"
		v-show="!getIsWishing" class="banners-sm">
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
	width: 100%;

}

@media only screen and (max-width: 1200px) and (orientation: landscape) {
	.banners-sm {
		flex-direction: column;
		position: relative;
		justify-content: center;
		/* background-color: rgba(0, 0, 0, 0.26); */
		height: 100%;
		width: unset;
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