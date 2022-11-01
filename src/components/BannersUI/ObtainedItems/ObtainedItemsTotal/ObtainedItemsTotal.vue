<template>
	<div class="banners-obtained-items-total">
		<div class="banners-obtained-items-total__item-box" v-for="item, index in getObtainedItems" :key="index">
			<Transition name="fade-right" appear>
				<TotalItem :index="index" :item="item" />
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

const { getObtainedItems, setShowObtainedItems, clearObtainedItems, setActiveWish } = useObtainedItems()
const { setIsWishing } = useWish()

const hideObtainItems = () => {
	setShowObtainedItems(false)
	setIsWishing(false)
	clearObtainedItems()
	setActiveWish(0)
}


</script>

<style lang="scss">
.banners-obtained-items-total {
	display: flex;
	width: 100%;
	max-width: 1200px;
	height: auto;
	padding: 0px 20px;
	justify-content: center;
	align-items: center;
	gap: 5px;

	&__item-box {
		width: 100%;
		height: fit-content;

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
	}
}

@media only screen and (orientation: portrait) {
	.banners-obtained-items-total {
		flex-wrap: wrap;

		padding: 20px 20px;

		overflow-y: auto;
		gap: 15px;
		justify-content: center;


		&__item-box {
			width: 15%;

		}
	}
}

@media only screen and (max-width: 915px) and (orientation: landscape) {
	.banners-obtained-items-total {
		gap: 3px;
		width: 90%;
	}
}
</style>