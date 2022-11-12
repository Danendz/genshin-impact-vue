<template>
	<div class="banners-obtained-items-total">
		<div @click="goToItem(item)" class="banners-obtained-items-total__item-box"
			v-for="item, index in getObtainedItems" :key="index">
			<Transition name="total-items" appear>
				<TotalItem :index="index" :item="item" />
			</Transition>
		</div>
		<div :style="{ position: 'absolute', width: '100%', height: '100%', maxWidth: '1250px', zIndex: -1 }">
			<BackButton :button-type="'close'" :is-with-background="true" class="banners-obtained-items-total__close"
				@click="hideObtainItems" />
		</div>
	</div>

</template>

<script setup lang="ts">
import { useObtainedItems } from '@/store/Gacha/obtainedItems';
import { useWish } from '@/store/Gacha/Wish';
import TotalItem from './TotalItem.vue';
import { useRouter } from 'vue-router';
import { isCharacter } from '@/Composables/isCharacter';
import { CharacterOrWeapon } from '@/Composables/UseWishing';
import BackButton from '@/components/UI/BackButton.vue';

const { getObtainedItems, setShowObtainedItems, clearObtainedItems, setActiveWish } = useObtainedItems()
const { setIsWishing } = useWish()
const router = useRouter()

const hideObtainItems = () => {
	closeWishes();
	setTimeout(() => {
		setIsWishing(false)
	}, 100);
}

const closeWishes = () => {
	setShowObtainedItems(false)
	clearObtainedItems()
	setActiveWish(0)
}

const goToItem = (item: CharacterOrWeapon) => {
	if (isCharacter(item)) router.push({ name: 'CharacterPage', params: { name: item.name_key } })
}

</script>

<style lang="scss">
@import '@/assets/Styles/animations/total-items';

.banners-obtained-items-total {
	display: flex;
	width: 100%;
	max-width: 1200px;
	padding: 0px 20px;
	justify-content: center;
	align-items: center;
	gap: 5px;
	z-index: 0;

	&__item-box {
		width: 100%;
		max-width: 111.5px;
		transition: .25s;
		cursor: pointer;
		z-index: 0;
		will-change: transform;

		&:hover {
			transform: scale(1.05);
		}
	}

	&__close {
		position: absolute;
		top: 15px;
		right: 0;
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

		&__close {
			right: 10px;
			top: 10px;
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
		max-width: 85vw;

		&__close {
			right: 10px;
			top: 10px;
		}
	}
}
</style>