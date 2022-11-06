//api
import BannersService from '@/API/BannersService'
import { BannersEntities } from '@/Enums/BannersEnums'

//interfaces
import { CurrentEventWeaponBanner, CurrentEventBanner } from '@/Interfaces/CurrentBanners'
import { EventBanners } from '@/Interfaces/EventBanners'
import { EventWeaponBanners } from '@/Interfaces/EventWeaponsBanners'
import { StandardBanner } from '@/Interfaces/StandardBanner'
import { DataResponseType } from '@/Types/DataResponseType'

const bannersService = new BannersService()

const useGetStandardBanner = async () => {
	const data: DataResponseType<StandardBanner> = await bannersService.getWithAdditionalUrl(`current-banners/${BannersEntities.STANDARD_BANNER}`)
	if (typeof data === 'string') return data;
	return data
}
const useGetBanner = async () => {
	const eventBannerData: DataResponseType<CurrentEventBanner> = await bannersService.getWithAdditionalUrl<CurrentEventBanner>(`current-banners/${BannersEntities.EVENT_BANNERS}`)
	const eventWeaponBannersData: DataResponseType<CurrentEventWeaponBanner> = await bannersService.getWithAdditionalUrl<CurrentEventWeaponBanner>(`current-banners/${BannersEntities.EVENT_WEAPON_BANNER}`)

	if (typeof eventBannerData === 'string' || typeof eventWeaponBannersData === 'string') {
		return ''
	}

	const eventBanner: DataResponseType<EventBanners> = await bannersService.getWithAdditionalUrl<EventBanners>(`${BannersEntities.EVENT_BANNERS}${eventBannerData.name}`)

	const eventWeaponBanner: DataResponseType<EventWeaponBanners> = await bannersService.getWithAdditionalUrl<EventWeaponBanners>(`${BannersEntities.EVENT_WEAPON_BANNER}${eventWeaponBannersData.name}`)

	return { eventBanner, eventWeaponBanner }
}

export { useGetStandardBanner, useGetBanner }