import { APIEntries } from "@/Enums/APIEntries"
import { CharacterImage } from "@/Enums/CharacterEnums"

export default class WeaponHelper {

	private static weaponsUrl: string = APIEntries.BASE_URL + APIEntries.WEAPONS
	public static getWeaponsImage(name: string, type: CharacterImage): string {
		return this.weaponsUrl + name.toLowerCase() + '/' + type
	}
}