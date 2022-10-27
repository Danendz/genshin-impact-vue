//api
import BannersService from '@/API/BannersService'

//enums
import { ErrorMessages } from '@/Enums/ErrorMessages'


//interfaces
import { CurrentBanner } from '@/Interfaces/CurrentBanner'
import { StandardBanner } from '@/Interfaces/StandardBanner'

const bannersService = new BannersService()
const STANDARD_BANNER = 'standard_banner/'
const CURRENT_BANNER = 'current_banner/'

const useGetStandardBanner = async () => {
	const data: StandardBanner | ErrorMessages.NOT_FOUND = await bannersService.getWithAdditionalUrl(STANDARD_BANNER)
	return data
}
const useGetCurrentBanner = async () => {
	const data: CurrentBanner | ErrorMessages.NOT_FOUND = await bannersService.getWithAdditionalUrl(CURRENT_BANNER)
	return data
}

export { useGetStandardBanner, useGetCurrentBanner }