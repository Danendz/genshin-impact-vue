
//composables
import { useGetCharacterByName, useGetCharacters } from "@/Composables/useGetCharacters"

//interfaces
import { Character } from "@/Interfaces/CharacterInterface"

//stores
import { useActiveCategory } from "../ActiveCategory"

//vue
import { computed, ComputedRef, Ref, ref, watch } from "vue"
import { useGlobalLanguage } from "../globalLanguage"
import { OptionsKeys } from "@/Enums/OptionsKeys"

export const useFetchCharacters = () => {
	const characters = ref<Character[] | null>(null)
	const error = ref<string | null>(null)
	let alreadyLoaded: string[] = []
	const { getActiveCategory, setActiveCategory } = useActiveCategory()
	const { getLanguage } = useGlobalLanguage()

	const fetchCharacters = async (name?: string, force?: boolean) => {
		const isNotArray = !Array.isArray(characters.value)
		const isArrayButLengthLessThanOrEqualToOne = Array.isArray(characters.value) && characters.value.length <= 1
		const hasError = error.value
		//fetching new data
		if (isNotArray || isArrayButLengthLessThanOrEqualToOne || hasError || force) {
			characters.value = null
			error.value = null
			alreadyLoaded = [OptionsKeys.ATTRIBUTES]
			let data;
			if (name) {
				data = await useGetCharacterByName(name.toLowerCase())
			} else {
				data = await useGetCharacters()
			}

			setData(data)

		} else {
			//if data already fetched so we can't fetch it again
			if (!alreadyLoaded.includes(getActiveCategory.value)) {
				const data = await useGetCharacters()
				addData(data)
				alreadyLoaded.push(getActiveCategory.value)
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
	const setData = (data: string | null | Character | Character[]) => {
		if (data) {
			if (typeof data === 'string') {
				error.value = data
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
	const addData = (data: string | Character[]) => {
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

	const getError: ComputedRef<Ref<string | null>> = computed(() => {
		return error
	})

	watch(getLanguage, () => {
		setActiveCategory(OptionsKeys.ATTRIBUTES)
		fetchCharacters(undefined, true)
	})

	return {
		getCharacters,
		getError,
		fetchCharacters,
	}
}