
import { APIEntries } from "@/Enums/APIEntries"

export default class HomeHelper {
	private static homeUrl = APIEntries.BASE_URL + APIEntries.GENSHIN_SITE;

	public static getHomeIcon(iconName: string): string {
		return this.homeUrl + APIEntries.HOME_ICONS + iconName
	}
	public static getHomeBackground(bgName: string): string {
		return this.homeUrl + APIEntries.HOME_BACKGROUNDS + bgName
	}
}