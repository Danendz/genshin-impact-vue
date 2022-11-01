import { LocalStorageData } from "@/Enums/LocalStorageData";
import { BannerTypes } from "@/Enums/WishEnums";
import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { useGetLocalStorageData, useSetLocalStorageData } from "../../Composables/localStorageHelper";

type Wishes = Record<Exclude<BannerTypes, BannerTypes.EVENT_WEAPON>, Ref<number>>

export const useWishes = defineStore('Wishes', () => {
	const localStorageData = useGetLocalStorageData(LocalStorageData.WISHES);

	const wishes = ref<Wishes>({
		[BannerTypes.STANDARD]: ref(localStorageData[BannerTypes.STANDARD] ?? 100),
		[BannerTypes.EVENT]: ref(localStorageData[BannerTypes.EVENT] ?? 100)
	});

	const setWishes = (wishesToSet: number, banner: BannerTypes) => {
		if (banner === BannerTypes.EVENT_WEAPON) banner = BannerTypes.EVENT
		wishes.value[banner] = wishesToSet
		useSetLocalStorageData('wishes', wishes.value[banner], banner)
	}

	const getWishes = (banner: BannerTypes) => {
		if (banner === BannerTypes.EVENT_WEAPON) banner = BannerTypes.EVENT
		return wishes.value[banner]
	}

	return { setWishes, getWishes }
})