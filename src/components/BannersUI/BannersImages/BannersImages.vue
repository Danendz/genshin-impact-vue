<template>
	<Transition name="banner-down">
		<section v-if="!getIsWishing" class="banners-layout__banners-sm">
			<TransitionGroup name="banner-down" appear>
				<img draggable="false" v-for="url, index in totalWishes" :key="index"
					:class="['banners-layout__banners-img-sm', { 'banners-layout__banners-img-sm_active': activeBannerImage === index }]"
					:src="url" @click="emit('set-active', index, ...findTrue(index))" />
			</TransitionGroup>
		</section>
	</Transition>
	<Transition name="fade-right">
		<section v-if="!getIsWishing" class="banners-layout__banners-lg">
			<TransitionGroup name="banner-right" appear mode="out-in">
				<img draggable="false" class="banners-layout__banners-img-lg" v-for="url, index in totalWishes"
					:key="index" :src="url" v-show="index === props.activeBannerImage" />
			</TransitionGroup>
			<WishButtons />
		</section>
	</Transition>
</template>


<script setup lang="ts">
import { BannerTypes } from '@/Enums/WishEnums';
import { useBannersData } from '@/store/Gacha/bannersData';
import { useWish } from '@/store/Gacha/Wish';
import { onMounted, ref } from 'vue';
import WishButtons from '../WishButtons.vue'

interface Props {
	activeBannerImage: number
}

const props = defineProps<Props>()
const { getCurrentBanner, getStandardBanner } = useBannersData()
const { getIsWishing } = useWish()

const emit = defineEmits<{
	(event: 'set-active', index: number, banner: BannerTypes, eventIndex?: number): void
}>()
const totalWishes = ref<string[]>([])

onMounted(() => {
	if (getCurrentBanner.value?.event_five_star_character_images) {
		totalWishes.value.push(...getCurrentBanner.value.event_five_star_character_images)
	}
	if (getCurrentBanner.value?.event_five_star_weapons_image) {
		totalWishes.value.push(getCurrentBanner.value.event_five_star_weapons_image)
	}
	if (getStandardBanner.value) {
		totalWishes.value.push(getStandardBanner.value.standard_image)
	}


})
const findTrue = (index: number): [BannerTypes, number?] => {

	if (!getCurrentBanner.value) return [BannerTypes.STANDARD]

	if (getCurrentBanner.value.event_five_star_character_images && index < getCurrentBanner.value.event_five_star_character_images.length) {
		return [BannerTypes.EVENT, index]
	} else if (getCurrentBanner.value.event_five_star_weapons_image && index === totalWishes.value.length - 1) {
		return [BannerTypes.STANDARD]
	} else {
		return [BannerTypes.EVENT_WEAPON]
	}
}

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
			margin: 0;


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