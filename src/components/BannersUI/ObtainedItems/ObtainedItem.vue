<template>
	<section @click="changeWish" class="banners-obtained-item">
		<Transition name="fade-wish-info" appear mode="out-in">
			<section :key="activeWish" class="banners-obtained-item__info">
				<img v-if="isCharacter(item)" draggable="false" :src="CharacterHelper.getElementImage(item.vision)" />
				<section class="banners-obtained-item__name-rarity">
					<p>{{ item.name }}</p>
					<Icon class="banners-obtained-item__rarity-star" icon="bxs:star" v-for="num in item.rarity"
						:key="num" />
				</section>
			</section>
		</Transition>
		<Transition name="fade-wish-img" mode="out-in" appear>
			<img :key="activeWish" class="banners-obtained-item__gacha-img" draggable="false" :src="isCharacter(item)
			? CharacterHelper.getCharacterImage(item.name_key, CharacterImage.GACHA_SPLASH_LQ)
			: CharacterHelper.getWeaponsImage(item.name_key, CharacterImage.GACHA_SPLASH_LQ)" />
		</Transition>
	</section>
</template>



<script setup lang="ts">
//iconify
import { Icon } from '@iconify/vue';

//helpers
import CharacterHelper from '@/helpers/CharacterHelper';

//enums
import { CharacterImage } from '@/Enums/CharacterEnums';

//composables
import { CharacterOrWeapon } from '@/Composables/UseWishing';

//interfaces
import { Character } from '@/Interfaces/CharacterInterface';

//store
import { useObtainedItems } from '@/store/Gacha/obtainedItems';

//vue
import { watch, ref } from 'vue';

interface Props {
	activeWish: number,
}

const emit = defineEmits<{
	(e: 'next-wish'): void
}>()

const props = defineProps<Props>()

const { getObtainedItems } = useObtainedItems()

const item = ref<CharacterOrWeapon>(getObtainedItems.value[props.activeWish])

watch(() => props.activeWish, () => {
	item.value = getObtainedItems.value[props.activeWish]
})

const isCharacter = (item: CharacterOrWeapon): item is Character => {
	return (item as Character).nation !== undefined
}

const changeWish = () => {
	emit('next-wish')
}
</script>


<style lang="scss">
.banners-obtained-item {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
	width: 100%;
	height: 100%;

	&__info {
		position: relative;
		display: flex;
		max-width: 300px;

		img {
			width: auto;
			height: 100%;
			z-index: 0;
		}

		.banners-obtained-item__name-rarity {
			z-index: 1;

			p {
				color: white;
				font-size: 35px;
				font-weight: bold;
			}

			.banners-obtained-item__rarity-star {

				color: yellow;
				font-size: 20px;
			}
		}
	}

	&__gacha-img {
		width: auto;
		min-width: 300px;
		max-width: 1000px;
		max-height: 90%;
		height: auto;
	}
}

@media only screen and (orientation: portrait) {
	.banners-obtained-item {
		flex-direction: column;

		&__info {
			justify-content: center;

			img {
				position: relative;
				left: 0;
				height: 90%;
			}

		}

		&__gacha-img {
			min-width: 0;
			max-width: 100%;
			max-height: 50%;
		}
	}
}

@media only screen and (max-width: 915px) {
	.banners-obtained-item {
		&__info {
			.banners-obtained-item__name-rarity {
				p {
					font-size: 30px;
				}

				.banners-obtained-item__rarity-star {
					font-size: 15px;
				}
			}
		}

		&__gacha-img {
			min-width: 100px;
		}
	}
}
</style>