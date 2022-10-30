import { defineStore } from "pinia";
import { CharacterOrWeapon } from "@/Composables/UseWishing";
import { BannerTypes } from "@/Enums/WishEnums";
import { usePrimogems } from "./primogems";
import { useWishes } from "./wishes";
import { useBannerEntities } from './bannerEntities'
import { useUpdateLocalStorageGacha } from "./updateLocalStorageGacha";
import { ref, computed } from "vue";

export const useWish = defineStore('wish', () => {
	const { getPrimogems, setPrimogems } = usePrimogems()
	const wishesStore = useWishes()
	const banners = useBannerEntities()
	const isWishing = ref(false)

	const getIsWishing = computed(() => {
		return isWishing
	})

	const setIsWishing = (value: boolean) => {
		isWishing.value = value;
	}

	function makeWishes(pulls: number, banner: BannerTypes.EVENT, eventItemIndex: number): CharacterOrWeapon[] | string;
	function makeWishes(pulls: number, banner: BannerTypes, eventItemIndex?: number): CharacterOrWeapon[] | string {
		if (!banners.bannersEntities) throw new Error("Персонажи еще не загружены!");

		if (banner === BannerTypes.EVENT && eventItemIndex === undefined) throw new Error("Вы не указали индекс ивентового персонажа")

		const err = takeWishes(pulls, banner)

		if (err) return "Недостаточно молитв!";

		let result: CharacterOrWeapon[] | string;

		if (BannerTypes.EVENT) {
			result = banners.bannersEntities[banner].makeWishes(pulls, eventItemIndex)
		} else {
			result = banners.bannersEntities[banner].makeWishes(pulls)
		}

		useUpdateLocalStorageGacha(banner)
		return result
	}

	const takeWishes = (pulls: number, banner: BannerTypes): void | boolean => {
		const totalWishes = wishesStore.getWishes(banner)

		if (pulls <= totalWishes) return wishesStore.setWishes(totalWishes - pulls, banner)

		pulls = (pulls - totalWishes) * 160

		if (pulls > getPrimogems.value) return true;

		wishesStore.setWishes(0, banner)
		setPrimogems(getPrimogems.value - pulls)
	}

	const addWishes = (amount: number, banner: BannerTypes) => {
		wishesStore.setWishes(wishesStore.getWishes(banner) + amount, banner)
	}

	const addPrimogems = (amount: number) => {
		setPrimogems(getPrimogems.value + amount)
	}


	return {
		addWishes,
		makeWishes,
		addPrimogems,
		getIsWishing,
		setIsWishing
	}
})