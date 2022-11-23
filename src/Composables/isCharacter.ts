import { Character } from "@/Interfaces/CharacterInterface"
import { CharacterOrWeapon } from "./UseWishing"

export const isCharacter = (item: CharacterOrWeapon): item is Character => {
	return (item as Character).nation_key !== undefined
}
