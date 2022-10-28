<template>
	<section v-if="getCurrentBanner && getStandardBanner" class="banners-layout__banners-sm">

		<TransitionGroup name="banner-down" appear>
			<img draggable="false"
				:class="['banners-layout__banners-img-sm', { 'banners-layout__banners-img-sm_active': activeBannerImage === index }]"
				v-for="url, index in getCurrentBanner.event_five_star_character_images" :key="index" :src="url"
				@click="emit('set-active', index, BannerTypes.EVENT, index)" />

			<img draggable="false" :key="2"
				:class="['banners-layout__banners-img-sm', { 'banners-layout__banners-img-sm_active': activeBannerImage === 2 }]"
				:src="getCurrentBanner.event_five_star_weapons_image"
				@click="emit('set-active', 2, BannerTypes.EVENT_WEAPON,)" />

			<img draggable="false" :key="3"
				:class="['banners-layout__banners-img-sm', { 'banners-layout__banners-img-sm_active': activeBannerImage === 3 }]"
				:src="getStandardBanner.standard_image" @click="emit('set-active', 3, BannerTypes.STANDARD)" />

		</TransitionGroup>
	</section>
	<section v-if="getCurrentBanner && getStandardBanner" class="banners-layout__banners-lg">
		<TransitionGroup name="banner-right" appear>
			<img draggable="false" class="banners-layout__banners-img-lg"
				v-for="url, index in getCurrentBanner.event_five_star_character_images" :key="index" :src="url"
				v-show="index === props.activeBannerImage" />

			<img draggable="false" :key="2" class="banners-layout__banners-img-lg"
				:src="getCurrentBanner.event_five_star_weapons_image" v-show="2 === activeBannerImage" />

			<img draggable="false" :key="3" class="banners-layout__banners-img-lg"
				:src="getStandardBanner.standard_image" v-show="3 === activeBannerImage" />

		</TransitionGroup>
		<WishButtons />
	</section>
</template>


<script setup lang="ts">
import { BannerTypes } from '@/Enums/WishEnums';
import { useBannersData } from '@/store/Gacha/bannersData';
import WishButtons from './WishButtons.vue'

interface Props {
	activeBannerImage: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
	(event: 'set-active', index: number, banner: BannerTypes, eventIndex?: number): void
}>()

const { getCurrentBanner, getStandardBanner } = useBannersData()

</script>


<style lang="scss">
.banners-layout {

	&__banners-sm,
	&__banners-lg {
		user-select: none;
		-webkit-user-drag: none;
	}

	&__banners-sm {
		display: flex;
		gap: 10px;
		margin-top: 20px;

		.banners-layout__banners-img-sm {
			width: 100px;
			border-radius: 10px;
			cursor: pointer;
			border: 2px solid transparent;
			transition: all .3s;

			&:hover {
				transform: scale(1.05);
				border-color: #f1c40f;
			}

			&_active {
				transform: scale(1.05);
				border-color: #f1c40f;
			}
		}
	}

	&__banners-lg {
		min-width: 300px;
		max-width: 1200px;
		width: 80%;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 10px;

		.banners-layout__banners-img-lg {
			width: 100%;
			height: 70vh;
			object-fit: contain;
		}

	}
}

@media only screen and (orientation: portrait) {
	.banners-layout {
		justify-content: center;
		margin-top: 0px;

		&__banners-sm {
			.banners-layout__banners-img-sm {
				width: 90px;
			}
		}

		&__banners-lg {
			width: 90%;
			align-items: center;

			.banners-layout__banners-img-lg {
				height: 55vw;
			}
		}
	}
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
	.banners-layout {
		margin-top: 0;

		&__banners-sm {
			flex-direction: column;
			margin: 0 40px 0 20px;

			.banners-layout__banners-img-sm {
				width: 80px;
			}
		}

		&__banners-lg {
			margin-top: 20px;
			max-width: 600px;
			width: 65%
		}
	}
}
</style>