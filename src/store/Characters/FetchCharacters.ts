//enums
import { ErrorMessages } from "@/Enums/ErrorMessages"

//composables
import { useGetCharacterByName, useGetCharacters } from "@/Composables/useGetCharacters"

//interfaces
import { Character } from "@/Interfaces/CharacterInterface"

//stores
import { useActiveCategory } from "../ActiveCategory"

//vue
import { computed, ComputedRef, Ref, ref } from "vue"

export const useFetchCharacters = () => {
	const characters = ref<Character[] | null>(null)
	const error = ref<ErrorMessages | null>(null)
	const alreadyLoaded: string[] = ["Attributes"]
	const active_category = useActiveCategory()

	const fetchCharacters = async (name?: string) => {
		const isNotArray = !Array.isArray(getCharacters.value)
		const isArrayButLengthLessThanOrEqualToOne = Array.isArray(getCharacters.value) && getCharacters.value.length <= 1
		const hasError = error.value

		//fetching new data
		if (isNotArray || isArrayButLengthLessThanOrEqualToOne || hasError || name) {
			characters.value = null
			error.value = null
			let data;
			if (name) {
				data = await useGetCharacterByName(name.toLowerCase())
			} else {
				data = await useGetCharacters()
			}
			setData(data)

		} else {
			//if data already fetched so we can't fetch it again
			if (!alreadyLoaded.includes(active_category.active_category)) {
				const data = await useGetCharacters()
				addData(data)
				alreadyLoaded.push(active_category.active_category)
			}
		}
	}

	//type guard for character
	const isCharacter = (character: Character | Character[]): character is Character => {
		if (!character) {
			return false
		}
		return (character as Character).name !== undefined
	}

	//setting data conditionally
	const setData = (data: ErrorMessages.NOT_FOUND | null | Character | Character[]) => {
		if (data) {
			if (data === ErrorMessages.NOT_FOUND) {
				error.value = ErrorMessages.NOT_FOUND
			} else if (isCharacter(data)) {
				//if data is only one character
				//set characters as array with only one character
				characters.value = [data]
			}
			else {
				characters.value = data
			}
		}
	}

	//adding additional data to existing data
	const addData = (data: ErrorMessages.NOT_FOUND | Character[]) => {
		if (Array.isArray(data)) {
			data.forEach((values, id) => {
				Object.keys(values).forEach((key) => {
					const charKey = key as keyof Character
					if (characters.value) {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						//@ts-ignore
						characters.value[id][charKey] = values[charKey]
					}
				})
			})
		}
		else {
			error.value = data
		}
	}

	//getting original array of characters
	const getCharacters: ComputedRef<Ref<Character[] | null>> = computed(() => {
		return characters
	})
	return {
		getCharacters,
		error,
		fetchCharacters,
	}
}