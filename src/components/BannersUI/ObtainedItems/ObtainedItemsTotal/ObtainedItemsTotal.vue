<template>
	<div class="banners-obtained-items-total">
		<div class="banners-obtained-items-total__item-box" v-for="item, index in getObtainedItems" :key="index">
			<Transition name="fade-right" appear>
				<TotalItem @last-end="lastEnd" :show-shadows="showShadows" :index="index" :item="item" />
			</Transition>
		</div>
		<button class="banners-obtained-items-total__close" @click="hideObtainItems">
			X
		</button>
	</div>
</template>

<script setup lang="ts">
import { useObtainedItems } from '@/store/Gacha/obtainedItems';
import { useWish } from '@/store/Gacha/Wish';
import TotalItem from './TotalItem.vue';
import { ref } from 'vue'
import { useWindowSize } from '@vueuse/core';

const { getObtainedItems, setShowObtainedItems, clearObtainedItems, setActiveWish } = useObtainedItems()
const { setIsWishing } = useWish()
const { width } = useWindowSize()

const hideObtainItems = () => {
	/* for mobile optimization bacause of lags */
	if (width.value <= 915) return hideWithDelay()
	/* for pc without optimization */
	return hideWithoutDelay()
}

const hideWithDelay = () => {
	showShadows.value = false
	setTimeout(() => {
		setShowObtainedItems(false)
	}, 50);
	setTimeout(() => {
		closeWishes()
	}, 200);
}

const hideWithoutDelay = () => {
	setShowObtainedItems(false)
	setTimeout(() => {
		closeWishes()
	}, 100);
}

const closeWishes = () => {
	setIsWishing(false)
	clearObtainedItems()
	setActiveWish(0)
}

const showShadows = ref(false)

/* after last element enable shadows on mobile */
const lastEnd = (index: number) => {
	if (getObtainedItems.value.length - 1 === index) {
		showShadows.value = true
	}
}

</script>

<style lang="scss">
.banners-obtained-items-total {
	display: flex;
	width: 100%;
	max-width: 1200px;
	padding: 0px 20px;
	justify-content: center;
	align-items: center;
	gap: 5px;

	&__item-box {
		max-width: 111.5px;
		transition: .25s;
		will-change: transform;

		&:hover {
			transform: scale(1.05);
		}
	}

	&__close {
		position: absolute;
		top: 5px;
		right: 5px;
		width: 45px;
		height: 45px;
		border-radius: 50%;
		cursor: pointer;
		border: 0;
	}
}

@media only screen and (orientation: portrait) {
	.banners-obtained-items-total {
		flex-wrap: wrap;

		padding: 20px 20px;

		overflow: hidden;
		gap: 15px;
		justify-content: center;


		&__item-box {
			width: 15%;
		}
	}
}

@media only screen and (max-width: 412px) and (orientation: portrait) {
	.banners-obtained-items-total {
		&__item-box {
			max-width: 53.3px;
		}
	}
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
	.banners-obtained-items-total {
		gap: 3px;
	}
}
</style>