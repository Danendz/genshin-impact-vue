//api
import BannersService from '@/API/BannersService'
import { BannersEntities } from '@/Enums/BannersEnums'

//enums
import { ErrorMessages } from '@/Enums/ErrorMessages'


//interfaces
import { CurrentEventWeaponBanner, CurrentEventBanner } from '@/Interfaces/CurrentBanners'
import { EventBanners } from '@/Interfaces/EventBanners'
import { EventWeaponBanners } from '@/Interfaces/EventWeaponsBanners'
import { StandardBanner } from '@/Interfaces/StandardBanner'

const bannersService = new BannersService()


const useGetStandardBanner = async () => {
	const data: StandardBanner | ErrorMessages.NOT_FOUND = await bannersService.getWithAdditionalUrl(`current-banners/${BannersEntities.STANDARD_BANNER}`)
	return data
}
const useGetBanner = async () => {
	const eventBannerData: CurrentEventBanner | ErrorMessages.NOT_FOUND = await bannersService.getWithAdditionalUrl<CurrentEventBanner>(`current-banners/${BannersEntities.EVENT_BANNERS}`)
	const eventWeaponBannersData: CurrentEventWeaponBanner | ErrorMessages.NOT_FOUND = await bannersService.getWithAdditionalUrl<CurrentEventWeaponBanner>(`current-banners/${BannersEntities.EVENT_WEAPON_BANNER}`)

	if (eventBannerData === ErrorMessages.NOT_FOUND || eventWeaponBannersData === ErrorMessages.NOT_FOUND) throw new Error(ErrorMessages.NOT_FOUND)

	const eventBanner: EventBanners | ErrorMessages.NOT_FOUND = await bannersService.getWithAdditionalUrl<EventBanners>(`${BannersEntities.EVENT_BANNERS}${eventBannerData.name}`)

	const eventWeaponBanner: EventWeaponBanners | ErrorMessages = await bannersService.getWithAdditionalUrl<EventWeaponBanners>(`${BannersEntities.EVENT_WEAPON_BANNER}${eventWeaponBannersData.name}`)

	return { eventBanner, eventWeaponBanner }
}

export { useGetStandardBanner, useGetBanner }