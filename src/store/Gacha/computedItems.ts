import { WishItems, CharacterOrWeapon } from "@/Composables/UseWishing";
import { CharacterRarity } from "@/Enums/CharacterEnums";
import { WeaponRarity, WeaponLocation } from "@/Enums/WeaponEnums";
import { computed } from "vue";
import { useCharacters } from "../Characters/Characters";
import { useWeapons } from "../Weapons/Weapons";

const standardFiveStarCharacters = ["jean", 'qiqi', 'tighnari', 'keqing', 'mona', 'diluc']

const standardFiveStarWeapons = ["Amo's Bow", "Skyward Harp", "Lost Prayer to the Sacred Winds",
	"Skyward Atlas", "Skyward Pride", "Wolf's Gravestone", "Primordial Jade Winged-Spear", "Skyward Spine", "Aquila Favonia", "Skyward Blade"]

const eventFiveStarCharacter = "raiden"
const eventFourStarCharacters = ["gorou", "sara", "bennett", "barbara"]
const eventFiveStarWeapon = "Mistsplitter Reforged"
const eventFourStarWeapons = ["Akuoumaru", "Watatsumi Wavewalker"]

export const useComputedItems = () => {

	const { getCharacters } = useCharacters()
	const { getWeapons } = useWeapons()

	const standardItems = computed<Pick<WishItems, "standardFiveStars" | "standardFourStars" | "standardThreeStars"> | null>(() => {
		if (getCharacters.value && getWeapons.value) {

			const standardFiveStars: CharacterOrWeapon[] = [
				...getCharacters.value.filter((character) => standardFiveStarCharacters.includes(character.name_key)),
				...getWeapons.value.filter((weapon) => standardFiveStarWeapons.includes(weapon.name))
			];
			const standardFourStars: CharacterOrWeapon[] = [
				...getCharacters.value.filter((character) => character.rarity.toString() === CharacterRarity.FOUR && !eventFourStarCharacters.includes(character.name_key) && character.name === 'Traveler'),
				...getWeapons.value.filter((weapon) => weapon.rarity === WeaponRarity.FOUR && !eventFiveStarWeapon.includes(weapon.name) && weapon.location === WeaponLocation.GACHA)
			];
			const standardThreeStars = getWeapons.value.filter((weapon) => weapon.rarity === WeaponRarity.THREE && weapon.location === WeaponLocation.GACHA)

			return {
				standardFiveStars,
				standardFourStars,
				standardThreeStars
			}
		}
		return null
	})

	const eventWeaponItems = computed<WishItems | null>(() => {
		if (getWeapons.value && standardItems.value) {
			const eventFiveStars = getWeapons.value.filter((weapon) => weapon.name === eventFiveStarWeapon)
			const eventFourStars = getWeapons.value.filter((weapon) => eventFourStarWeapons.includes(weapon.name))
			return {
				...standardItems.value,
				eventFiveStars,
				eventFourStars
			}
		}
		return null
	})

	const eventCharacterItems = computed<WishItems | null>(() => {
		if (getCharacters.value && standardItems.value) {
			const eventFiveStars = getCharacters.value.filter((character) => character.name_key === eventFiveStarCharacter)
			const eventFourStars = getCharacters.value.filter((character) => eventFourStarCharacters.includes(character.name_key))
			return {
				...standardItems.value,
				eventFiveStars,
				eventFourStars
			}
		}
		return null
	})

	return { standardItems, eventCharacterItems, eventWeaponItems }
}