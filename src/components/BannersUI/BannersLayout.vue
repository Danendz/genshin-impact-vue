<template>
	<Transition name="fade" appear>
		<section class="banners-layout">
			<BannersImages :activeBannerImage="activeBannerImage" @set-active="setActive" />

			<section class="banners-layout__bg-video-container">
				<video class="banners-layout__bg-video" muted autoplay>
					<source src="https://vue-impact.herokuapp.com/gachaVideos/backgroundCropped.mp4">
				</video>
			</section>
		</section>
	</Transition>
</template>

<script setup lang="ts">

import { BannerTypes } from '@/Enums/WishEnums';
import { useWish } from '@/store/Gacha/Wish';

import { ref, watch } from 'vue'
import BannersImages from './BannersImages.vue';

const { setActiveBannerWish } = useWish()

const activeBannerImage = ref(0)

function setActive(index: number, banner: BannerTypes, eventIndex?: number): void {
	if (banner === BannerTypes.EVENT && eventIndex === undefined) throw new Error("Вы не указали ивентовый индекс для персонажа!")
	setActiveBannerWish([banner, eventIndex])
	activeBannerImage.value = index
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

		gap: 0;
	}
}
</style>