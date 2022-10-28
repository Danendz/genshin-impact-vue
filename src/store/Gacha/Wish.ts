import { defineStore } from "pinia";
import { CharacterOrWeapon } from "@/Composables/UseWishing";
import { BannerTypes } from "@/Enums/WishEnums";
import { usePrimogems } from "./primogems";
import { useWishes } from "./wishes";
import { useBannerEntities } from './bannerEntities'
import { useUpdateLocalStorageGacha } from "./updateLocalStorageGacha";

export const useWish = defineStore('wish', () => {
	const primogemsStore = usePrimogems()
	const wishesStore = useWishes()
	const banners = useBannerEntities()

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

		if (pulls > primogemsStore.primogems) return true;

		wishesStore.setWishes(0, banner)
		primogemsStore.setPrimogems(primogemsStore.primogems - pulls)
	}

	const addWishes = (amount: number, banner: BannerTypes) => {
		wishesStore.setWishes(wishesStore.getWishes(banner) + amount, banner)
	}

	const addPrimogems = (amount: number) => {
		primogemsStore.setPrimogems(primogemsStore.primogems + amount)
	}


	return {
		addWishes,
		makeWishes,
		addPrimogems
	}
})