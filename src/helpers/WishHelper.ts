import { APIEntries } from "@/Enums/APIEntries"
import { WeaponType } from "@/Enums/WeaponEnums"

export default class WishHelper {
	private static bannersUrl: string = APIEntries.BASE_URL
	private static wishWeaponsIconsUrl: string = APIEntries.BASE_URL + APIEntries.WEAPONS_WISH_ICONS

	public static getBannersImages(iconUrl: string): string {
		return this.bannersUrl + iconUrl
	}

	public static getWishBackground(): string {
		return this.bannersUrl + '/wish/wishBackground/background'
	}

	public static getBannerImageByName(banner: string, name: string): string {
		return `${this.bannersUrl}/${banner}${name}banner`
	}
	public static getWishWeaponsIcons(type: WeaponType): string {
		return `${this.wishWeaponsIconsUrl}${type.toLowerCase()}/icon.svg`
	}
}