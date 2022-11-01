<template>
	<Transition name="banner-down">
		<section v-if="!getIsWishing" class="banners-sm">
			<TransitionGroup name="banner-down" appear>
				<img draggable="false" v-for="url, index in totalWishes" :key="index"
					:class="['banners-sm__img', { 'banners-sm__img_active': activeBannerImage === index }]" :src="url"
					@click="emit('set-active', index, ...findTrue(index))" />
			</TransitionGroup>
		</section>
	</Transition>
	<Transition name="fade-right" appear>
		<section v-if="!getIsWishing" class="banners-lg">
			<Transition name="banner-right" mode="out-in" appear>
				<img :key="props.activeBannerImage" draggable="false" class="banners-lg__img"
					:src="totalWishes[activeBannerImage]" />
			</Transition>
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
.banners-sm,
.banners-lg {
	user-select: none;
	-webkit-user-drag: none;
}

.banners-sm {
	display: flex;
	gap: 10px;
	margin-top: 20px;
	z-index: 2;

	&__img {
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

.banners-lg {
	min-width: 300px;
	max-width: 1200px;
	width: 80%;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 10px;

	&__img {
		width: 100%;
		height: 70vh;
		object-fit: contain;
	}

}

@media only screen and (orientation: portrait) {
	.banners-sm {
		gap: 2px;

		&__img {
			width: 90px;
		}
	}

	.banners-lg {
		width: 90%;
		align-items: center;

		&__img {
			height: 55vw;
		}
	}
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
	.banners-sm {
		flex-direction: column;
		margin: 0;

		&__img {
			width: 80px;
		}
	}

	.banners-lg {
		margin-top: 20px;
		max-width: 600px;
		width: 65%
	}
}
</style>