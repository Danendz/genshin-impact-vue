import { WishItems, CharacterOrWeapon } from "@/Composables/UseWishing";
import { CharacterRarity } from "@/Enums/CharacterEnums";
import { WeaponRarity, WeaponLocation } from "@/Enums/WeaponEnums";
import { computed } from "vue";
import { useCharacters } from "../Characters/Characters";
import { useWeapons } from "../Weapons/Weapons";
import { useBannersData } from "./bannersData";

export const useComputedItems = () => {

	const { getCharacters } = useCharacters()
	const { getWeapons } = useWeapons()

	const { getStandardBanner, getEventBanner, getEventWeaponBanner } = useBannersData()

	const standardItems = computed<Pick<WishItems, "standardFiveStars" | "standardFourStars" | "standardThreeStars"> | null>(() => {
		if (getCharacters.value && getWeapons.value && getStandardBanner.value && getEventBanner.value && getEventWeaponBanner.value) {

			const standardFiveStarCharacter = getStandardBanner.value.standard_five_star_characters;
			const standardFiveStarWeapons = getStandardBanner.value.standard_five_star_weapons
			const newEventFourStarCharacters = getEventBanner.value.new_event_four_star_characters
			const newEventFourStarWeapons = getEventWeaponBanner.value.new_event_four_star_weapon

			const standardFiveStars: CharacterOrWeapon[] = [
				...getCharacters.value.filter((character) => standardFiveStarCharacter.includes(character.name_key)),
				...getWeapons.value.filter((weapon) => standardFiveStarWeapons.includes(weapon.name_key))
			];

			const standardFourStars: CharacterOrWeapon[] = [
				...getCharacters.value.filter((character) => character.rarity.toString() === CharacterRarity.FOUR && !newEventFourStarCharacters.includes(character.name_key) && character.name !== 'Traveler'),
				...getWeapons.value.filter((weapon) => weapon.rarity === WeaponRarity.FOUR && !newEventFourStarWeapons.includes(weapon.name_key) && weapon.location === WeaponLocation.GACHA)
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
		if (getWeapons.value && standardItems.value && getEventWeaponBanner.value) {
			const eventFiveStarWeapons = getEventWeaponBanner.value.event_five_star_weapons
			const eventFourStarWeapons = getEventWeaponBanner.value.event_four_star_weapons

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
		if (getCharacters.value && standardItems.value && getEventBanner.value) {
			const eventFiveStarCharacter = getEventBanner.value.event_five_star_character
			const eventFourStarCharacters = getEventBanner.value.event_four_star_characters

			const eventFiveStars = getCharacters.value.filter((character) => eventFiveStarCharacter.includes(character.name_key))
			eventFiveStars.sort((a, b) => eventFiveStarCharacter.indexOf(a.name_key) - eventFiveStarCharacter.indexOf(b.name_key))

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