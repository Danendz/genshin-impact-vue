import { CharacterRarity } from "@/Enums/CharacterEnums";
import { WeaponRarity } from "@/Enums/WeaponEnums";
import { isCharacter } from "./isCharacter";
import { CharacterOrWeapon } from "./UseWishing";

type rarityType = Exclude<WeaponRarity, WeaponRarity.ONE | WeaponRarity.TWO> | CharacterRarity
export type ColorsType = Record<rarityType, string>

export const getBackgroundColor = (item: CharacterOrWeapon, colors: ColorsType) => {
	if (!isCharacter(item) && (item.rarity !== WeaponRarity.ONE && item.rarity !== WeaponRarity.TWO)) {
		return colors[item.rarity]
	}
	if (isCharacter(item)) {
		return colors[item.rarity]
	}
}
