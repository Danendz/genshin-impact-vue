import { BannerTypes } from "@/Enums/WishEnums";
import { useBannerEntities, ILocalStorageData } from "./bannerEntities";
import { useSetLocalStorageData } from "../../Composables/localStorageHelper";

const banners = useBannerEntities()

export const useUpdateLocalStorageGacha = (banner: BannerTypes) => {

	if (!banners.bannersEntities) throw new Error('Баннеры не готовы!')

	const newLocalStorageData: ILocalStorageData = {
		userFiveStarPity: banners.bannersEntities[banner].userFiveStarPity,
		userFourStarPity: banners.bannersEntities[banner].userFourStarPity,
		isFiveStarGuaruntee: banners.bannersEntities[banner].isFiveStarGuaruntee,
		isFourStarGuaruntee: banners.bannersEntities[banner].isFourStarGuaruntee
	}

	useSetLocalStorageData<ILocalStorageData>(banner, newLocalStorageData)
}