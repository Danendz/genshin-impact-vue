<template>
	<section class="banners-obtained-items">
		<Transition name="fade" mode="out-in">
			<section v-if="getActiveWish !== getObtainedItems.length" class="banners-obtained-items__items">
				<ObtainedItem @next-wish="nextWish" :active-wish="getActiveWish" />
			</section>
			<ObtainedItemsTotal v-else />
		</Transition>
	</section>
</template>

<script setup lang="ts">
import ObtainedItem from './ObtainedItem.vue';
import { useObtainedItems } from '@/store/Gacha/obtainedItems';
import ObtainedItemsTotal from './ObtainedItemsTotal/ObtainedItemsTotal.vue'

const { getObtainedItems, getActiveWish, setActiveWish } = useObtainedItems()
const nextWish = () => {
	if (getObtainedItems.value.length !== getActiveWish.value) {
		setActiveWish(getActiveWish.value + 1)
	}
}

</script>

<style lang="scss">
.banners-obtained-items {
	width: 100%;
	height: 100vh;
	position: absolute;
	background-image: url('@/assets/Images/wish-background.webp');
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	justify-content: center;
	align-items: center;

	&__items {
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.267);
		z-index: 9;
		user-select: none;
	}

}
</style>