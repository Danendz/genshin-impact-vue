<template>
	<Transition name="fade" appear>
		<section :style="{ backgroundImage: `url(${WishHelper.getWishBackground()})` }" v-if="getShowObtainedItems"
			class="banners-obtained-items">
			<Transition name="fade" mode="out-in">
				<section v-if="getActiveWish !== getObtainedItems.length" class="banners-obtained-items__items">
					<ObtainedItem @next-wish="nextWish" :active-wish="getActiveWish" />
				</section>
				<ObtainedItemsTotal v-else />
			</Transition>
		</section>
	</Transition>
</template>

<script setup lang="ts">
import ObtainedItem from './ObtainedItem/ObtainedItem.vue';
import { useObtainedItems } from '@/store/Gacha/obtainedItems';
import ObtainedItemsTotal from './ObtainedItemsTotal/ObtainedItemsTotal.vue'
import WishHelper from '@/helpers/WishHelper';

const { getShowObtainedItems, getObtainedItems, getActiveWish, setActiveWish } = useObtainedItems()

const nextWish = () => {
	if (getObtainedItems.value.length !== getActiveWish.value) {
		setActiveWish(getActiveWish.value + 1)
	}
}

</script>

<style lang="scss">
.banners-obtained-items {
	width: 100vw;
	height: 100vh;
	position: absolute;
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
		background-color: rgba(0, 0, 0, 0.349);
		z-index: 9;
		user-select: none;
	}

}
</style>