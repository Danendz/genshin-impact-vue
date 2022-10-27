import { IWishParams, WishItems, UseWishing } from "@/Composables/UseWishing"
import { BannerTypes } from "@/Enums/WishEnums"
import { defineStore } from "pinia"
import { ComputedRef, computed } from "vue"
import { useComputedItems } from "./computedItems"
import { useGetLocalStorageData } from "../../Composables/localStorageHelper"

interface IWishParamsWithNull extends Omit<IWishParams, "wishItems"> {
	wishItems: ComputedRef<WishItems | null>
}

type BannersData = {
	[Property in BannerTypes]: IWishParamsWithNull
}

export interface ILocalStorageData {
	userFiveStarPity: number,
	userFourStarPity: number,
	isFiveStarGuaruntee: boolean,
	isFourStarGuaruntee: boolean,
	wishes?: number
}

export const useBannerEntities = defineStore('GachaBannersEntity', () => {

	const localStorageData: Record<BannerTypes, ILocalStorageData> = {
		[BannerTypes.STANDARD]: useGetLocalStorageData(BannerTypes.STANDARD),
		[BannerTypes.EVENT]: useGetLocalStorageData(BannerTypes.EVENT),
		[BannerTypes.EVENT_WEAPON]: useGetLocalStorageData(BannerTypes.EVENT_WEAPON)
	}

	const { standardItems, eventWeaponItems, eventCharacterItems } = useComputedItems()

	const createBannersData = (banner: BannerTypes): IWishParamsWithNull => {
		let wishItems: ComputedRef<WishItems | null>;

		switch (banner) {
			case BannerTypes.STANDARD:
				wishItems = standardItems
				break;
			case BannerTypes.EVENT:
				wishItems = eventCharacterItems;
				break;
			case BannerTypes.EVENT_WEAPON:
				wishItems = eventWeaponItems;
				break;
		}
		return {
			userFiveStarPity: localStorageData[banner]?.userFiveStarPity ?? 0,
			userFourStarPity: localStorageData[banner]?.userFourStarPity ?? 0,
			isFiveStarGuaruntee: localStorageData[banner]?.isFiveStarGuaruntee ?? false,
			isFourStarGuaruntee: localStorageData[banner]?.isFourStarGuaruntee ?? false,
			bannerType: banner,
			wishItems: wishItems
		}
	}

	const bannersData: BannersData = {
		[BannerTypes.STANDARD]: createBannersData(BannerTypes.STANDARD),
		[BannerTypes.EVENT]: createBannersData(BannerTypes.EVENT),
		[BannerTypes.EVENT_WEAPON]: createBannersData(BannerTypes.EVENT_WEAPON)
	}

	const bannersEntities = computed<Record<BannerTypes, UseWishing> | null>(() => {
		if (eventWeaponItems.value && eventCharacterItems.value) {
			return {
				[BannerTypes.STANDARD]: new UseWishing(bannersData[BannerTypes.STANDARD] as IWishParams),
				[BannerTypes.EVENT]: new UseWishing(bannersData[BannerTypes.EVENT] as IWishParams),
				[BannerTypes.EVENT_WEAPON]: new UseWishing(bannersData[BannerTypes.EVENT_WEAPON] as IWishParams, 80),
			}
		}
		return null
	});

	return { bannersEntities }
})