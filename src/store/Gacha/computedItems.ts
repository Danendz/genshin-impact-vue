import { WishItems, CharacterOrWeapon } from "@/Composables/UseWishing";
import { CharacterRarity } from "@/Enums/CharacterEnums";
import { WeaponRarity, WeaponLocation } from "@/Enums/WeaponEnums";
import { computed } from "vue";
import { useCharacters } from "../Characters/Characters";
import { useWeapons } from "../Weapons/Weapons";
import { useBannersData } from "./bannersData";

/* const standardFiveStarCharacters = ["jean", 'qiqi', 'tighnari', 'keqing', 'mona', 'diluc']

const standardFiveStarWeapons = ["Amo's Bow", "Skyward Harp", "Lost Prayer to the Sacred Winds",
	"Skyward Atlas", "Skyward Pride", "Wolf's Gravestone", "Primordial Jade Winged-Spear", "Skyward Spine", "Aquila Favonia", "Skyward Blade"]

const eventFiveStarCharacter = "raiden"
const eventFourStarCharacters = ["gorou", "sara", "bennett", "barbara"]
const eventFiveStarWeapon = ["Mistsplitter Reforged"]
const eventFourStarWeapons = ["Akuoumaru", "Watatsumi Wavewalker"] */

export const useComputedItems = () => {

	const { getCharacters } = useCharacters()
	const { getWeapons } = useWeapons()

	const { getStandardBanner, getCurrentBanner } = useBannersData()

	const standardItems = computed<Pick<WishItems, "standardFiveStars" | "standardFourStars" | "standardThreeStars"> | null>(() => {
		if (getCharacters.value && getWeapons.value && getStandardBanner.value && getCurrentBanner.value) {

			const standardFiveStarCharacter = getStandardBanner.value.standard_five_star_characters;
			const standardFiveStarWeapons = getStandardBanner.value.standard_five_star_weapons
			const eventFourStarCharacters = getCurrentBanner.value.event_four_star_characters
			const eventFourStarWeapons = getCurrentBanner.value.event_four_star_weapons

			const standardFiveStars: CharacterOrWeapon[] = [
				...getCharacters.value.filter((character) => standardFiveStarCharacter.includes(character.name_key)),
				...getWeapons.value.filter((weapon) => standardFiveStarWeapons.includes(weapon.name_key))
			];
			const standardFourStars: CharacterOrWeapon[] = [
				...getCharacters.value.filter((character) => character.rarity.toString() === CharacterRarity.FOUR && !eventFourStarCharacters.includes(character.name_key) && character.name !== 'Traveler'),
				...getWeapons.value.filter((weapon) => weapon.rarity === WeaponRarity.FOUR && !eventFourStarWeapons.includes(weapon.name_key) && weapon.location === WeaponLocation.GACHA)
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
		if (getWeapons.value && standardItems.value && getCurrentBanner.value) {
			const eventFiveStarWeapons = getCurrentBanner.value.event_five_star_weapons
			const eventFourStarWeapons = getCurrentBanner.value.event_four_star_weapons

			const eventFiveStars = getWeapons.value.filter((weapon) => eventFiveStarWeapons.includes(weapon.name_key))
			const eventFourStars = getWeapons.value.filter((weapon) => eventFourStarWeapons.includes(weapon.name_key))

			if (eventFiveStars.length !== eventFiveStarWeapons.length || eventFourStars.length !== eventFourStarWeapons.length) throw new Error('На сервере не достаточно ивентовых оружий!')

			return {
				...standardItems.value,
				eventFiveStars,
				eventFourStars
			}
		}
		return null
	})

	const eventCharacterItems = computed<WishItems | null>(() => {
		if (getCharacters.value && standardItems.value && getCurrentBanner.value) {
			const eventFiveStarCharacter = getCurrentBanner.value.event_five_star_character
			const eventFourStarCharacters = getCurrentBanner.value.event_four_star_characters

			const eventFiveStars = getCharacters.value.filter((character) => character.name_key === eventFiveStarCharacter)
			const eventFourStars = getCharacters.value.filter((character) => eventFourStarCharacters.includes(character.name_key))

			if (!eventFiveStars.length || eventFourStars.length !== eventFourStarCharacters.length) throw new Error('На сервере не достаточно ивентовых персонажей!')
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