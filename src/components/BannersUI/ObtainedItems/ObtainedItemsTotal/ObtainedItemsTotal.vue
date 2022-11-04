<template>
	<div class="banners-obtained-items-total">
		<div @click="goToItem(item)" class="banners-obtained-items-total__item-box"
			v-for="item, index in getObtainedItems" :key="index">
			<Transition name="total-items" appear>
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
import { useRouter } from 'vue-router';
import { isCharacter } from '@/Composables/isCharacter';
import { CharacterOrWeapon } from '@/Composables/UseWishing';

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

	&__item-box {
		max-width: 111.5px;
		transition: .25s;
		cursor: pointer;
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
		max-width: 85vw;
	}
}
</style>